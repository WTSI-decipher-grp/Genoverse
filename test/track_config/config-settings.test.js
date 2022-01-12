const { Genoverse, afterTest, testCanvas } = require('../utils');

describe('Config settings', () => {
  afterEach(afterTest);

  const trackDef = {
    data: [
      { chr: 1, start: 1,  end: 10, type: 'A', subtype: 1, label: 'A1', color: 'black'  },
      { chr: 1, start: 21, end: 30, type: 'A', subtype: 2, label: 'A2', color: 'blue'   },
      { chr: 1, start: 41, end: 50, type: 'B', subtype: 1, label: 'B1', color: 'orange' },
      { chr: 1, start: 61, end: 70, type: 'B', subtype: 2, label: 'B2', color: 'purple' },
    ],
    configSettings: {
      type: {
        all : { featureFilter: false },
        a   : { featureFilter: feature => feature.type === 'A' },
        b   : { featureFilter: feature => feature.type === 'B' },
      },
      subtype: {
        all : { featureFilter: false },
        1   : { featureFilter: feature => feature.subtype === 1 },
        2   : { featureFilter: feature => feature.subtype === 2 },
      },
      colorscheme: {
        default : { beforeDrawFeature: false },
        red     : { beforeDrawFeature: (f) => { f.color = 'red';   } },
        green   : { beforeDrawFeature: (f) => { f.color = 'green'; } },
      },
      squish: {
        true: {
          featureHeight : 2,
          featureMargin : { top: 1, right: 1, bottom: 1, left: 0 },
          labels        : false,
        },
        false: {
          featureHeight : 6,
          featureMargin : { top: 2, right: 2, bottom: 2, left: 0 },
          labels        : true,
        },
      },
    },
    defaultConfig: {
      type        : 'all',
      subtype     : 'all',
      colorscheme : 'default',
      squish      : false,
    },
  };

  describe('Track attributes are set correctly', () => {
    const [ track ] = new Genoverse({
      chr            : 1,
      start          : 1,
      end            : 100,
      chromosomeSize : 100,
      tracks         : [ Genoverse.Track.extend($.extend(true, {}, trackDef)) ],
    }).tracks;

    const checkSettings = ($track, confType) => {
      const conf = $track[confType] || $track.config;

      Object.keys(conf).forEach(
        (type) => {
          const settings = $track.configSettings[type][conf[type]];

          Object.entries(settings).forEach(
            ([ key, value ]) => {
              if (key === 'featureFilter') {
                expect(
                  $track.prop('featureFilters').filter(f => f === value).length
                ).toBe(
                  value === false ? 0 : 1
                );
              } else {
                expect($track.prop(key)).toEqual(value);
              }
            }
          );
        }
      );
    };

    it('Initial settings are determined by defaultConfig', () => { checkSettings(track, 'defaultConfig'); });

    describe('Changing config settings', () => {
      Object.entries(track.configSettings).forEach(
        ([ type, configSetting ]) => {
          Object.keys(configSetting).forEach(
            (config) => {
              it(`${type} = ${config}`, () => {
                track.setConfig(type, config);
                expect(track.config[type]).toBe(config);
                checkSettings(track);
              });
            }
          );
        }
      );
    });
  });

  describe('Track, model, view and controller can all have properties and functions set by config', () => {
    let testNow = false;

    const test = (obj, a, b) => {
      if (testNow) {
        expect(a).toEqual(b);
      }
    };

    const [ track ] = new Genoverse({
      chr            : 1,
      start          : 1,
      end            : 100,
      chromosomeSize : 100,
      tracks         : [
        Genoverse.Track.extend({
          afterDraw: function () {
            const d = this.prop('_testDeferred');

            if (d) {
              d.resolve();
            }
          },
          data           : [],
          name           : 'test',
          configSettings : {
            test: {
              1: {
                name           : 1,                      // track property
                clickTolerance : 1,                      // controller property
                dataBuffer     : { start: 100, end: 0 }, // model property that gets used by setDefaults to set dataBufferStart
                dataType       : 1,                      // model property that isn't touched by setDefaults
                featureMargin  : { top: 1 },             // view property that gets modified by setDefaults
                minScaledWidth : 1,                      // view property that isn't touched by setDefaults
                setMVC         : function (...args) {
                  const rtn = this.base(...args);

                  test('track', this.name, 'test - 1');

                  return rtn;
                },
                render: function (...args) {
                  test('controller', this.clickTolerance,  1);

                  return this.base(...args);
                },
                findFeatures: function (...args) {
                  test('model', this.dataBufferStart, 100);
                  test('model', this.dataType,        1);

                  return this.base(...args);
                },
                draw: function (...args) {
                  test('view', this.featureMargin,  { top: 1, right: 0, bottom: 0, left: 0 });
                  test('view', this.minScaledWidth, 1);

                  return this.base(...args);
                },
                _testDeferred: $.Deferred(),
              },
              2: {
                name           : 2,
                clickTolerance : 2,
                dataBuffer     : { start: 200, end: 100 },
                dataType       : 2,
                featureMargin  : { right: 1, left: 2 },
                minScaledWidth : 2,
                setMVC         : function (...args) {
                  const rtn = this.base(...args);

                  test('track', this.name, 'test - 2');

                  return rtn;
                },
                render: function (...args) {
                  test('controller', this.clickTolerance, 2);

                  return this.base(...args);
                },
                findFeatures: function (...args) {
                  test('model', this.dataBuffer, { start: 200, end: 100 });
                  test('model', this.dataType,   2);

                  return this.base(...args);
                },
                draw: function (...args) {
                  test('view',  this.featureMargin, { top: 0, right: 1, bottom: 0, left: 2 });
                  test('view', this.minScaledWidth, 2);

                  return this.base(...args);
                },
                _testDeferred: $.Deferred(),
              },
            },
          },
        }),
      ],
    }).tracks;

    it('config 1', () => {
      testNow = true;
      track.setConfig('test', 1);

      return track._testDeferred;
    });

    it('config 2', () => {
      track.setConfig('test', 2);

      return track._testDeferred;
    });
  });

  describe('Config and zoom settings interact correctly', () => {
    const genoverse = new Genoverse({
      chr            : 1,
      start          : 1,
      end            : 20,
      chromosomeSize : 9e99,
      tracks         : [
        Genoverse.Track.extend({
          data           : [],
          url            : false,
          legend         : false,
          configSettings : {
            test: {
              1 : { xhrFields: { test: 1 }, depth: 1 },
              2 : { xhrFields: { test: 2 }, depth: 2 },
              3 : { xhrFields: { test: 3 }, depth: 3 },
            },
          },
          defaultConfig : { test: 1 },
          1             : { view: Genoverse.Track.View.extend({ _testId: 1    }), model: Genoverse.Track.Model.extend({ _testId: 1    }) },
          1000          : { view: Genoverse.Track.View.extend({ _testId: 1000 }), model: Genoverse.Track.Model.extend({ _testId: 1000 }) },
        }),
      ],
    });

    const [ track ] = genoverse.tracks;

    it('Initial properties are correct', () => {
      expect(track.prop('xhrFields')).toEqual({ test: 1 });
      expect(track.prop('depth')).toBe(1);

      expect(track.model._testId).toBe(1);
      expect(track.view._testId).toBe(1);
    });

    it('After setConfig and then zooming out to a new model/view, properties defined in setConfig are still used', () => {
      track.setConfig('test', 2);
      genoverse.moveTo(1, 1, 1001);

      expect(track.prop('xhrFields')).toEqual({ test: 2 });
      expect(track.prop('depth')).toBe(2);

      expect(track.model._testId).toBe(1000);
      expect(track.view._testId).toBe(1000);
    });

    it('After zooming back in to an existing model/view, properties defined in previous setConfig are still used', () => {
      genoverse.moveTo(1, 1, 20);

      expect(track.prop('xhrFields')).toEqual({ test: 2 });
      expect(track.prop('depth')).toBe(2);

      expect(track.model._testId).toBe(1);
      expect(track.view._testId).toBe(1);
    });

    it('After setConfig and then zooming out to an existing model/view, properties defined in setConfig are still used', () => {
      track.setConfig('test', 3);
      genoverse.moveTo(1, 1, 1001);

      expect(track.prop('xhrFields')).toEqual({ test: 3 });
      expect(track.prop('depth')).toBe(3);

      expect(track.model._testId).toBe(1000);
      expect(track.view._testId).toBe(1000);
    });
  });

  describe('Features are drawn correctly', () => {
    const [ track ] = new Genoverse({
      chr            : 1,
      start          : 1,
      end            : 100,
      width          : 100,
      chromosomeSize : 1000,
      isStatic       : true,
      tracks         : [ Genoverse.Track.extend(trackDef) ],
    }).tracks;

    const draw = [
      [[ 0,  2, 10, 6           ], [ 'fillText', 'A1', 0,  10          ]],
      [[ 20, 2, 10, 6, 'blue'   ], [ 'fillText', 'A2', 20, 10, 'blue'   ]],
      [[ 40, 2, 10, 6, 'orange' ], [ 'fillText', 'B1', 40, 10, 'orange' ]],
      [[ 60, 2, 10, 6, 'purple' ], [ 'fillText', 'B2', 60, 10, 'purple' ]],
    ];

    [
      { type: 'a',   subtype: 'all', draw: draw[0].concat(draw[1]) },
      { type: 'b',   subtype: 'all', draw: draw[2].concat(draw[3]) },
      { type: 'all', subtype: 1,     draw: draw[0].concat(draw[2]) },
      { type: 'a',   subtype: 1,     draw: draw[0]                 },
      { type: 'a',   subtype: 2,     draw: draw[1]                 },
      { type: 'b',   subtype: 1,     draw: draw[2]                 },
      { type: 'b',   subtype: 2,     draw: draw[3]                 },

      { squish: true,                        draw: [[ 60, 1, 10, 2, 'purple' ]] },
      { squish: true,  colorscheme: 'red',   draw: [[ 60, 1, 10, 2, 'red'    ]] },
      { squish: false, colorscheme: 'green', draw: [[ 60, 2, 10, 6, 'green'  ], [ 'fillText', 'B2', 60, 10, 'green' ]] },

      { type: 'all', subtype: 'all', colorscheme: 'default', draw: draw.reduce((a, b) => a.concat(b))  },
    ].forEach(
      (config) => {
        it(`when ${Object.entries(config).map(([ k, v ]) => (k === 'draw' ? null : `${k} = ${v}`)).join(', ')}`, (done) => {
          track.afterRender = function (f, image) {
            testCanvas(this, config.draw, image, image.data('featureHeight'), 'features');
            done();
          };

          track.setConfig(config);
        });
      }
    );
  });
});
