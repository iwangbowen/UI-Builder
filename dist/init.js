require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({157:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _jquery = require('../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

var _constants = require('./constants');

var _htmlGenerator = require('./util/htmlGenerator');

var _htmlGenerator2 = _interopRequireDefault(_htmlGenerator);

var _jsoup = require('./util/jsoup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};

(0, _jquery2.default)(document).ready(function () {
    // Vvveb.Builder.init('demo/playground/index.html', function () {
    // });

    _builder2.default.Gui.init();
    _builder2.default.FileManager.init();
    var hash = window.location.hash && window.location.hash.substr(1);
    if (hash == _constants.importedPage) {
        _pages2.default.unshift({
            name: _constants.importedPage,
            title: 'Imported Page',
            url: _jsoup.importedPageHref,
            srcdoc: (0, _htmlGenerator2.default)(localStorage.getItem(_constants.importedPage, _jsoup.generateBaseTag), _jsoup.generateDevDependentTags, _jsoup.generateBaseTag)
        });
    }
    _builder2.default.FileManager.addPages(_pages2.default);
    var page = _builder2.default.FileManager.getPage(window.location.hash && window.location.hash.substr(1));
    if (page) {
        _builder2.default.Builder.init(page.url, page.srcdoc, function () {});
        _builder2.default.FileManager.showActive(page.name);
    } else {
        _builder2.default.Builder.init(_pages2.default[0].url, _pages2.default[0].srcdoc, function () {});
        _builder2.default.FileManager.showActive(_pages2.default[0].name);
    }
});

},{"../js/jquery.min":1,"./builder":58,"./constants":154,"./pages":180,"./util/htmlGenerator":191,"./util/jsoup":192}],180:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var pages = [{ name: 'pds', title: 'PDS Template', url: 'template/oee/html/demo/demo.html' },
// { name: 'pds_commo', title: 'PDS Common Template', url: 'template/oee/html/demo/common_demo.html' },
{ name: 'playground', title: 'Playground', url: 'demo/playground/index.html'
    // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
    // { name: "album", title: "Album", url: "demo/album/index.html" },
    // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
    // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
    // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
    // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
    // { name: "product", title: "Product", url: "demo/product/index.html" } 
}];

exports.default = pages;

},{}]},{},[157])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiLCJzcmNcXHBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLFNBQVMsZUFBVCxDQUF5QixNQUF6QixFQUFpQztBQUM3QixRQUFJLE1BQUosRUFBWTtBQUNSLFlBQUksWUFBWSxPQUFPLGFBQVAsSUFBd0IsT0FBTyxlQUFQLENBQXVCLFlBQS9EO0FBQ0EsWUFBSSxVQUFVLFFBQVYsQ0FBbUIsSUFBdkIsRUFBNkI7QUFDekIsbUJBQU8sTUFBUCxHQUFnQixVQUFVLFFBQVYsQ0FBbUIsZUFBbkIsQ0FBbUMsWUFBbkMsSUFBbUQsVUFBVSxRQUFWLENBQW1CLElBQW5CLENBQXdCLFlBQTNGO0FBQ0g7QUFDSjtBQUNKOztBQUVELHNCQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVk7QUFDMUI7QUFDQTs7QUFFQSxzQkFBTSxHQUFOLENBQVUsSUFBVjtBQUNBLHNCQUFNLFdBQU4sQ0FBa0IsSUFBbEI7QUFDQSxRQUFNLE9BQU8sT0FBTyxRQUFQLENBQWdCLElBQWhCLElBQXdCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUE0QixDQUE1QixDQUFyQztBQUNBLFFBQUksUUFBUSx1QkFBWixFQUEwQjtBQUN0Qix3QkFBTSxPQUFOLENBQWM7QUFDVixrQkFBTSx1QkFESTtBQUVWLG1CQUFPLGVBRkc7QUFHVixpQkFBSyx1QkFISztBQUlWLG9CQUFRLDZCQUFjLGFBQWEsT0FBYixDQUFxQix1QkFBckIsRUFBbUMsc0JBQW5DLENBQWQsRUFBbUUsK0JBQW5FLEVBQTZGLHNCQUE3RjtBQUpFLFNBQWQ7QUFNSDtBQUNELHNCQUFNLFdBQU4sQ0FBa0IsUUFBbEIsQ0FBMkIsZUFBM0I7QUFDQSxRQUFJLE9BQU8sa0JBQU0sV0FBTixDQUFrQixPQUFsQixDQUEwQixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsSUFBd0IsT0FBTyxRQUFQLENBQWdCLElBQWhCLENBQXFCLE1BQXJCLENBQTRCLENBQTVCLENBQWxELENBQVg7QUFDQSxRQUFJLElBQUosRUFBVTtBQUNOLDBCQUFNLE9BQU4sQ0FBYyxJQUFkLENBQW1CLEtBQUssR0FBeEIsRUFBNkIsS0FBSyxNQUFsQyxFQUEwQyxZQUFZLENBQ3JELENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixnQkFBTSxDQUFOLEVBQVMsR0FBNUIsRUFBaUMsZ0JBQU0sQ0FBTixFQUFTLE1BQTFDLEVBQWtELFlBQVksQ0FDN0QsQ0FERDtBQUVBLDBCQUFNLFdBQU4sQ0FBa0IsVUFBbEIsQ0FBNkIsZ0JBQU0sQ0FBTixFQUFTLElBQXRDO0FBQ0g7QUFDSixDQTFCRDs7Ozs7O0FDaEJBLElBQU0sUUFBUSxDQUNWLEVBQUUsTUFBTSxLQUFSLEVBQWUsT0FBTyxjQUF0QixFQUFzQyxLQUFLLGtDQUEzQyxFQURVO0FBRVY7QUFDQSxFQUFFLE1BQU0sWUFBUixFQUFzQixPQUFPLFlBQTdCLEVBQTJDLEtBQUs7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQSxDQUhVLENBQWQ7O2tCQWFlLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuL3BhZ2VzJztcclxuaW1wb3J0ICQgZnJvbSAnLi4vanMvanF1ZXJ5Lm1pbic7XHJcbmltcG9ydCB7IGltcG9ydGVkUGFnZSwgYmFzZUhyZWYgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBodG1sR2VuZXJhdG9yIGZyb20gJy4vdXRpbC9odG1sR2VuZXJhdG9yJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVCYXNlVGFnLCBpbXBvcnRlZFBhZ2VIcmVmLCBnZW5lcmF0ZURldkRlcGVuZGVudFRhZ3MgfSBmcm9tICcuL3V0aWwvanNvdXAnO1xyXG5cclxuZnVuY3Rpb24gc2V0SWZyYW1lSGVpZ2h0KGlmcmFtZSkge1xyXG4gICAgaWYgKGlmcmFtZSkge1xyXG4gICAgICAgIHZhciBpZnJhbWVXaW4gPSBpZnJhbWUuY29udGVudFdpbmRvdyB8fCBpZnJhbWUuY29udGVudERvY3VtZW50LnBhcmVudFdpbmRvdztcclxuICAgICAgICBpZiAoaWZyYW1lV2luLmRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgaWZyYW1lLmhlaWdodCA9IGlmcmFtZVdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IGlmcmFtZVdpbi5kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBWdnZlYi5CdWlsZGVyLmluaXQoJ2RlbW8vcGxheWdyb3VuZC9pbmRleC5odG1sJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgVnZ2ZWIuR3VpLmluaXQoKTtcclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmluaXQoKTtcclxuICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XHJcbiAgICBpZiAoaGFzaCA9PSBpbXBvcnRlZFBhZ2UpIHtcclxuICAgICAgICBwYWdlcy51bnNoaWZ0KHtcclxuICAgICAgICAgICAgbmFtZTogaW1wb3J0ZWRQYWdlLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0ltcG9ydGVkIFBhZ2UnLFxyXG4gICAgICAgICAgICB1cmw6IGltcG9ydGVkUGFnZUhyZWYsXHJcbiAgICAgICAgICAgIHNyY2RvYzogaHRtbEdlbmVyYXRvcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpbXBvcnRlZFBhZ2UsIGdlbmVyYXRlQmFzZVRhZyksIGdlbmVyYXRlRGV2RGVwZW5kZW50VGFncywgZ2VuZXJhdGVCYXNlVGFnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgVnZ2ZWIuRmlsZU1hbmFnZXIuYWRkUGFnZXMocGFnZXMpO1xyXG4gICAgdmFyIHBhZ2UgPSBWdnZlYi5GaWxlTWFuYWdlci5nZXRQYWdlKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XHJcbiAgICBpZiAocGFnZSkge1xyXG4gICAgICAgIFZ2dmViLkJ1aWxkZXIuaW5pdChwYWdlLnVybCwgcGFnZS5zcmNkb2MsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICBWdnZlYi5GaWxlTWFuYWdlci5zaG93QWN0aXZlKHBhZ2UubmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIFZ2dmViLkJ1aWxkZXIuaW5pdChwYWdlc1swXS51cmwsIHBhZ2VzWzBdLnNyY2RvYywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFZ2dmViLkZpbGVNYW5hZ2VyLnNob3dBY3RpdmUocGFnZXNbMF0ubmFtZSk7XHJcbiAgICB9XHJcbn0pOyIsImNvbnN0IHBhZ2VzID0gW1xyXG4gICAgeyBuYW1lOiAncGRzJywgdGl0bGU6ICdQRFMgVGVtcGxhdGUnLCB1cmw6ICd0ZW1wbGF0ZS9vZWUvaHRtbC9kZW1vL2RlbW8uaHRtbCcgfSxcclxuICAgIC8vIHsgbmFtZTogJ3Bkc19jb21tbycsIHRpdGxlOiAnUERTIENvbW1vbiBUZW1wbGF0ZScsIHVybDogJ3RlbXBsYXRlL29lZS9odG1sL2RlbW8vY29tbW9uX2RlbW8uaHRtbCcgfSxcclxuICAgIHsgbmFtZTogJ3BsYXlncm91bmQnLCB0aXRsZTogJ1BsYXlncm91bmQnLCB1cmw6ICdkZW1vL3BsYXlncm91bmQvaW5kZXguaHRtbCcgfVxyXG4gICAgLy8geyBuYW1lOiBcIm5hcnJvdy1qdW1ib3Ryb25cIiwgdGl0bGU6IFwiSnVtYm90cm9uXCIsIHVybDogXCJkZW1vL25hcnJvdy1qdW1ib3Ryb24vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYWxidW1cIiwgdGl0bGU6IFwiQWxidW1cIiwgdXJsOiBcImRlbW8vYWxidW0vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYmxvZ1wiLCB0aXRsZTogXCJCbG9nXCIsIHVybDogXCJkZW1vL2Jsb2cvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiY2Fyb3VzZWxcIiwgdGl0bGU6IFwiQ2Fyb3VzZWxcIiwgdXJsOiBcImRlbW8vY2Fyb3VzZWwvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwib2ZmY2FudmFzXCIsIHRpdGxlOiBcIk9mZmNhbnZhc1wiLCB1cmw6IFwiZGVtby9vZmZjYW52YXMvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJpY2luZ1wiLCB0aXRsZTogXCJQcmljaW5nXCIsIHVybDogXCJkZW1vL3ByaWNpbmcvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJvZHVjdFwiLCB0aXRsZTogXCJQcm9kdWN0XCIsIHVybDogXCJkZW1vL3Byb2R1Y3QvaW5kZXguaHRtbFwiIH0gXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlczsiXX0=
