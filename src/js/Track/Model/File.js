import Model from 'js/Track/Model';

export default Model.extend({
  dataType: 'text',

  init: function (...args) {
    if (this.isLocal) {
      this.url = false;
    }

    if (!(this.largeFile || this.indexFile)) {
      this.allData = true;
    }

    this.base(...args);
  },

  getData: function (chr, ...args) {
    if (this.isLocal && this.dataFile) {
      const reader   = new FileReader();
      const deferred = $.Deferred();

      reader.onload = (e) => {
        deferred.done(() => {
          this.receiveData(e.target.result, chr, 1, this.browser.getChromosomeSize(chr));
        }).resolve();
      };

      reader.readAsText(this.dataFile);

      return deferred;
    }

    return this.base(chr, ...args);
  },
});
