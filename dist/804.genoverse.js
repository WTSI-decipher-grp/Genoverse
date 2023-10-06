"use strict";(self.webpackChunkgenoverse=self.webpackChunkgenoverse||[]).push([[804],{1804:function(t,e,a){a.r(e);var n=a(4394);e.default={controlPanel:function(t){var e=this.jQuery;this.controls=[{name:"Scroll left and right by pressing and holding these buttons",buttons:[{name:"Scroll left",icon:'<i class="fas fa-chevron-left"></i>',class:"gv-scroll-left"},{name:"Scroll right",icon:'<i class="fas fa-chevron-right"></i>',class:"gv-scroll-right"}],init:function(t){var a=e(this);a.find(".gv-scroll-left, .gv-scroll-right").on({mousedown:function(){t.startDragScroll()},mouseup:function(){t.stopDragScroll()}}),a.find(".gv-scroll-left").mousehold(50,(function(){t.move(t.scrollDelta)})),a.find(".gv-scroll-right").mousehold(50,(function(){t.move(-t.scrollDelta)}))}},{name:"Zoom-in and zoom-out",buttons:[{name:"Zoom in",icon:'<i class="fas fa-search-plus"></i>',class:"gv-zoom-in",action:function(t){t.zoomIn()}},{name:"Zoom out",icon:'<i class="fas fa-search-minus"></i>',class:"gv-zoom-out",action:function(t){t.zoomOut()}}]},{name:"Toggle your mouse drag action between scroll left/right and select region",buttons:[{name:"Mouse drag action to scroll the browser left or right",icon:'<i class="fas fa-arrows-alt-h"></i>',class:"gv-drag-scroll",action:function(t){t.setDragAction("scroll"),e(this).addClass("gv-active").siblings().removeClass("gv-active")}},{name:"Mouse drag action to select a region",icon:"<i></i>",class:"gv-drag-select",action:function(t){t.setDragAction("select"),e(this).addClass("gv-active").siblings().removeClass("gv-active")}}],init:function(t){e(this).find(".gv-drag-".concat(t.dragAction)).addClass("gv-active").siblings().removeClass("gv-active")}},{name:"Toggle your mouse wheel action between zoom in/out and default page scroll",buttons:[{name:"Mouse wheel action to scroll the page up and down",icon:'<i class="fas fa-arrows-alt-v"></i>',class:"gv-wheel-off",action:function(t){t.setWheelAction("off"),e(this).addClass("gv-active").siblings().removeClass("gv-active")}},{name:"Mouse wheel to zoom in and out",icon:"&#177;",class:"gv-wheel-zoom",action:function(t){t.setWheelAction("zoom"),e(this).addClass("gv-active").siblings().removeClass("gv-active")}}],init:function(t){e(this).find(".gv-wheel-".concat(t.wheelAction)).addClass("gv-active").siblings().removeClass("gv-active")}}],this.saveable&&this.controls.push({icon:'<i class="fas fa-undo"></i>',name:"Reset tracks and configuration",action:function(t){t.resetConfig()}}),this.on({beforeInit:function(){var t=this,a=this;this.tracksLibrary=(this.tracksLibrary||this.tracks).map((function(e){return t.normaliseTrackDefinition(e)})).filter((function(t){return t.prototype.name}));var n=e('\n        <table cellspacing=0 cellpadding=0 class="gv">\n          <tr>\n            <td class="gv-panel gv-panel-left"></td>\n            <td class="gv-canvas-container"></td>\n            <td class="gv-panel gv-panel-right"></td>\n          </tr>\n        </table>\n      ').appendTo(this.container).find(".gv-panel-right");this.controlPanel=n,this.superContainer=this.container,this.container=e(".gv-canvas-container",this.container),a.controls.forEach((function(t){var n=e('<div class="gv-button-set">').attr("title",t.name).appendTo(a.superContainer.find(".gv-panel-right"));(t.buttons||[t]).forEach((function(i){var s=e("<button>".concat(i.icon,"</button>")).addClass(i.class).attr("title",i.name).appendTo(n);i.action&&s.on("click",(function(){i.action.call(s[0],a)})),i.init&&i!==t&&i.init.call(s[0],a)})),t.init&&t.init.call(n,a)})),this.superContainer.width(this.width),e(document).on("keydown",(function(t){27===t.keyCode&&(n.find("button.gv-drag-select").hasClass("gv-active")&&n.find("button.gv-drag-scroll").trigger("click"),e(".gv-menu .gv-close").trigger("click"))}))},afterInit:function(){var a=this,n=e('<button class="gv-tracks-library-button" title="Tracks menu"><i class="fas fa-bars"></i> Tracks</button>').on("click",(function(){var n=this,i=function t(e,a){var n,i;return null!==(n=e.constructor)&&void 0!==n&&null!==(i=n.ancestor)&&void 0!==i&&i.prototype?t(e.constructor.ancestor.prototype,a.concat(e.constructor.ancestor.prototype.tags||[])):a};if(e(this).hasClass("gv-active"))e(".gv-menu.gv-tracks-menu .gv-close").trigger("click"),e(this).removeClass("gv-active");else{var s=e(this).data("menu");if(s)s.show();else{var o;s=a.makeMenu({"Currently enabled tracks:":"Available tracks:",'<div class="gv-current-tracks"></div>':'<input placeholder="Search"><div class="gv-available-tracks"></div>'}).addClass("gv-tracks-menu"),e("input[placeholder=Search]",s).on("keyup",(function(){var t=this.value.toLowerCase();e(".gv-tracks-library-item",s).each((function(){var a=e(this).data("track"),n=!1;a.name&&a.name.toLowerCase().indexOf(t)>=0?n=!0:i(a,[]).concat(a.tags||[]).some((function(e){return e.toLowerCase().indexOf(t)>=0}))&&(n=!0);e(this)[n?"removeClass":"addClass"]("gv-hide")})),e(".gv-tracks-library-category",s).each((function(){var t=e(this).children(".gv-tracks-library-item:not(.gv-hide)");e(this)[t.length?"removeClass":"addClass"]("gv-hide")}))})),e(".gv-close",s).on("click",(function(){e(n).removeClass("gv-active")}));var r=e(".gv-available-tracks",s),c=e(".gv-current-tracks",s).before('<div class="gv-current-tracks-instructions">Drag and drop to reorder</div>').data({reload:function(){e(this).empty().data("listTracks")()},listTracks:function(){a.tracks.filter((function(t){return t.name&&!(!1===t.removable&&t.unsortable)&&!t.parentTrack&&!t.lockToTrack})).forEach((function(t){var a=e('<div class="gv-tracks-menu-track">').append('<span class="gv-tracks-menu-track-name" title="'.concat(t.name,'">').concat(t.defaultName,"</span>")).appendTo(c).data("track",t).addClass(t.unsortable?"gv-unsortable":"");!1===t.removable?a.prepend('<i class="gv-remove-track gv-menu-button fas fa-circle">'):a.prepend(e('<i class="gv-remove-track gv-menu-button fas fa-times-circle">').on("click",(function(){t.remove()})));var n=a.find(".gv-tracks-menu-track-name").tipsy({gravity:"w",trigger:"manual"}).on("mouseenter",(function(){var t=e(this).tipsy("show").data("tipsy").$tip;t&&t.css("zIndex",1002)})).on("mouseleave",(function(){e(this).tipsy("hide")}));t.name===t.defaultName&&n.tipsy("disable")}))}}).sortable({items:"div:not(.gv-unsortable)",cursor:"move",axis:"y",handle:"span",update:a.updateTrackOrder.bind(a),start:function(){c.find(".gv-tracks-menu-track-name").each((function(){e(this).tipsy("hide").tipsy("disable")}))},stop:function(){c.find(".gv-tracks-menu-track-name").each((function(){e(this).tipsy("enable")}))}});if(c.data("listTracks")(),a.saveable&&e('<div class="gv-tracks-menu-reset gv-menu-button"><i class="fas fa-undo"></i> Reset tracks and configuration</div>').insertAfter(c).on("click",(function(t){t.preventDefault(),a.resetConfig()})),null!==(o=a.tracksLibrary)&&void 0!==o&&o.length){var l=a.tracksLibrary.filter((function(t){return t.prototype.name&&!1!==t.prototype.removable})).reduce((function(t,e){var a=e.prototype.category||"";return t[a]=t[a]||[],t[a].push([e.prototype.name.toLowerCase(),e]),t}),{}),d=((null==t?void 0:t.tracksLibraryCategoryOrder)||[]).reduce((function(t,e,a){return Object.assign(t,(s=a+1,(i=e)in(n={})?Object.defineProperty(n,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[i]=s,n));var n,i,s}),{});Object.keys(l).sort((function(t,e){return Boolean(e)-Boolean(t)||d[t]-d[e]||t.localeCompare(e)})).forEach((function(t,n,i){var s=i.length>1?e('<div class="gv-tracks-library-category">').append(e('<div class="gv-tracks-library-category-header">').html(t||"Other")).appendTo(r):r;l[t].sort((function(t,e){return t[0].localeCompare(e[0])})).forEach((function(t){var n=t[1];e('<div class="gv-tracks-library-item">').append(e('<i class="gv-add-track gv-menu-button fas fa-plus-circle">').on("click",(function(){a.trackIds=a.trackIds||{},a.trackIds[n.prototype.id]=a.trackIds[n.prototype.id]||1,a.addTrack(n.extend({id:"".concat(n.prototype.id).concat(a.tracksById[n.prototype.id]?a.trackIds[n.prototype.id]++:"")}))}))).append("<span>".concat(n.prototype.name,"</span>")).appendTo(s).data("track",n.prototype)}))}))}s.css({left:"50%",marginLeft:s.width()/-2}),e(this).data("menu",s)}e(this).addClass("gv-active")}}));this.labelContainer.prepend(e('<li class="gv-unsortable">').append(e('<div class="gv-button-set" title="Tracks menu">').append(n)))},afterAddDomElements:function(){this.wrapper.after('<div class="gv-powered-by">Powered by <a target="_blank" href="https://github.com/DECIPHER-genomics/Genoverse">Genoverse</a></div>'),this.superContainer.find(".gv-panel-left").append(this.labelContainer)},"afterAddTracks afterRemoveTracks":function(){var t=this.superContainer.find(".gv-tracks-menu .gv-current-tracks");t.length&&t.data("reload").call(t)}}),this.on({afterSetName:function(t){var a=this.track;if(null!=a&&a.browser){var n=a.browser.superContainer.find(".gv-tracks-library-button").data("menu");n&&n.find(".gv-tracks-menu-track").filter((function(){return e(this).data("track")===a})).children(".gv-tracks-menu-track-name").attr("title",t).each((function(){t===a.defaultName?e(this).tipsy("hide").tipsy("disable"):e(this).tipsy("enable")}))}}},"tracks")},requires:n.default}},4394:function(t,e,a){a.r(e);var n=a(5337);e.default={karyotype:function(t){var e=this.jQuery;function a(){var a=e('<div class="gv-chromosome">'),i=e('<div class="gv-karyotype-container">').html(a).insertBefore(this.wrapper),s=this.assembly||this.genomeName,o="".concat(t.showAssembly&&s?"".concat(s,": "):"","Chr ").concat(this.chr);t.showAssembly&&s&&i.addClass("gv-show-assembly");var r=e('<div class="gv-chromosome"><ul class="gv-label-container"><li><span class="gv-name">'.concat(o,"</span></li></ul></div>")).appendTo(i),c=!1===t.karyotypeLabel?0:r.find(".gv-name").outerWidth(!0)+10;r.remove(),this.karyotype=new Genoverse({parent:this,container:a,width:a.width(),genome:this.genome,chr:this.chr,start:1,end:this.chromosomeSize,isStatic:!0,tracks:[n.default.extend({name:o,height:20,featureHeight:20,border:!1,legend:!1,unsortable:!0,click:function(t){var a=this.container.parent().offset().left,n=t.pageX-a,i=this.featurePositions.search({x:n,y:1,w:1,h:1})[0];if(i)if("mouseup"===t.type)this.browser.parent.isStatic||this.browser.parent.moveTo(i.chr,i.start,i.end,!0);else if(this.hoverFeature!==i&&!this.browser.hideTooltip){if(this.container.tipsy("hide"),i.label){var s=a+i.position[this.scale].start+i.position[this.scale].width/2;this.container.attr("title",i.label[0]).tipsy({trigger:"manual",container:"body"}).tipsy("show").data("tipsy").$tip.css("left",(function(){return s-e(this).width()/2}))}this.hoverFeature=i}},addUserEventHandlers:function(){var t=this;this.base(),this.container.on({mousemove:function(e){t.click(e)},mouseout:function(e){if(t.browser.viewPoint.is(e.relatedTarget)||t.browser.viewPoint.find(e.relatedTarget).length)return!0;t.container.tipsy("hide"),t.hoverFeature=!1}},".gv-image-container"),this.container.on("mousewheel",".gv-image-container, .gv-selector",(function(t){t.stopPropagation()}))},afterSetName:function(){this.label.css("lineHeight","".concat(this.label.height(),"px"))}})],addUserEventHandlers:function(){},afterInit:function(){this.updatePosition(),this.viewPoint.fadeIn()},afterAddTracks:function(){this.track=this.tracks[0]},afterAddDomElements:function(){var a=this,n=this.parent;function s(){a.hideTooltip=!0,a.track.prop("container").tipsy("hide")}function o(t,i){a.hideTooltip=!1;var s=a.chromosomeSize/a.width,o="resizestop"===t.type?e(this).data("ui-resizable").axis:void 0,r="e"===o?n.start:Math.max(Math.floor(i.position.left*s),1),c="w"===o?n.end:"dragstop"===t.type?r+n.length-1:Math.floor(i.helper.outerWidth(!0)*s)+r;r===n.start&&c===n.end||n.moveTo(a.chr,r,c,!0,"dragstop"===t.type)}!1===t.karyotypeLabel?(this.labelContainer.remove(),this.labelContainer=e(),i.addClass("gv-no-label")):this.labelContainer.width(c),this.viewPoint=e('<div class="gv-karyotype-viewpoint-wrapper"><div class="gv-karyotype-viewpoint"></div></div>').appendTo(i).css({left:c,width:this.width-c}).children().on({mousemove:function(t){a.track.controller.click(t)},mouseout:function(t){var n=e(t.relatedTarget);if(a.viewPoint.is(n)||a.viewPoint.find(n).length||"IMG"===n.prop("nodeName")&&n.parent().is(a.track.prop("imgContainers")[0]))return!0;a.track.prop("container").tipsy("hide"),a.track.prop("hoverFeature",!1)}}),n.isStatic||this.viewPoint.draggable({axis:"x",containment:this.wrapper,start:s,stop:o}).resizable({handles:"e, w",containment:"parent",start:s,stop:o,resize:function(t,e){e.element.css("left",Math.max(0,e.position.left)),e.position.left>0?e.element.width(Math.min(e.size.width,e.element.parent().width()-e.position.left)):e.element.width(e.size.width+e.position.left)}})},updatePosition:function(){var t=this.parent.start*this.scale,e=this.parent.end*this.scale-t;this.viewPoint.css({left:t,width:e})}}),!0!==this.loadedPlugins.controlPanel&&e('<li class="gv-unsortable">').height((function(t,e){return e+i.height()})).prependTo(this.labelContainer)}function i(){var t=this.karyotype.container.parent();this.karyotype.destroy(),t.remove(),a.call(this)}this.on({afterInit:a,afterSetRange:function(){this.karyotype&&this.karyotype.updatePosition()},afterSetWidth:i,afterMoveTo:function(t){this.karyotype&&this.karyotype.chr!==t&&i.call(this)}})}}}}]);
//# sourceMappingURL=804.genoverse.js.map