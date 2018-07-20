require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({154:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _jquery = require('../js/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

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
    _builder2.default.FileManager.addPages(_pages2.default);
    var page = _builder2.default.FileManager.getPage(window.location.hash && window.location.hash.substr(1));
    if (page) {
        _builder2.default.Builder.init(page.url, function () {});
        _builder2.default.FileManager.showActive(page.name);
    } else {
        _builder2.default.Builder.init(_pages2.default[0].url, function () {});
        _builder2.default.FileManager.showActive(_pages2.default[0].name);
    }
});

},{"../js/jquery.min":1,"./builder":58,"./pages":177}],177:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var pages = [{ name: 'oee template', title: 'PDS Template', url: 'template/oee/html/demo/demo.html' }, { name: 'template', title: 'Template', url: 'web/html/demo/demo.html' }, { name: "playground", title: "Playground", url: "demo/playground/index.html"
    // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
    // { name: "album", title: "Album", url: "demo/album/index.html" },
    // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
    // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
    // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
    // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
    // { name: "product", title: "Product", url: "demo/product/index.html" } 
}];

exports.default = pages;

},{}]},{},[154])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiLCJzcmNcXHBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUM7QUFDN0IsUUFBSSxNQUFKLEVBQVk7QUFDUixZQUFJLFlBQVksT0FBTyxhQUFQLElBQXdCLE9BQU8sZUFBUCxDQUF1QixZQUEvRDtBQUNBLFlBQUksVUFBVSxRQUFWLENBQW1CLElBQXZCLEVBQTZCO0FBQ3pCLG1CQUFPLE1BQVAsR0FBZ0IsVUFBVSxRQUFWLENBQW1CLGVBQW5CLENBQW1DLFlBQW5DLElBQW1ELFVBQVUsUUFBVixDQUFtQixJQUFuQixDQUF3QixZQUEzRjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxzQkFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzFCO0FBQ0E7O0FBRUEsc0JBQU0sR0FBTixDQUFVLElBQVY7QUFDQSxzQkFBTSxXQUFOLENBQWtCLElBQWxCO0FBQ0Esc0JBQU0sV0FBTixDQUFrQixRQUFsQixDQUEyQixlQUEzQjtBQUNBLFFBQUksT0FBTyxrQkFBTSxXQUFOLENBQWtCLE9BQWxCLENBQTBCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixJQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBbEQsQ0FBWDtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ04sMEJBQU0sT0FBTixDQUFjLElBQWQsQ0FBbUIsS0FBSyxHQUF4QixFQUE2QixZQUFZLENBQ3hDLENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixnQkFBTSxDQUFOLEVBQVMsR0FBNUIsRUFBaUMsWUFBWSxDQUM1QyxDQUREO0FBRUEsMEJBQU0sV0FBTixDQUFrQixVQUFsQixDQUE2QixnQkFBTSxDQUFOLEVBQVMsSUFBdEM7QUFDSDtBQUNKLENBakJEOzs7Ozs7QUNiQSxJQUFNLFFBQVEsQ0FDVixFQUFFLE1BQU0sY0FBUixFQUF3QixPQUFPLGNBQS9CLEVBQStDLEtBQUssa0NBQXBELEVBRFUsRUFFVixFQUFFLE1BQU0sVUFBUixFQUFvQixPQUFPLFVBQTNCLEVBQXVDLEtBQUsseUJBQTVDLEVBRlUsRUFHVixFQUFFLE1BQU0sWUFBUixFQUFzQixPQUFPLFlBQTdCLEVBQTJDLEtBQUs7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQSxDQUhVLENBQWQ7O2tCQWFlLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuL3BhZ2VzJztcclxuaW1wb3J0ICQgZnJvbSAnLi4vanMvanF1ZXJ5Lm1pbic7XHJcblxyXG5mdW5jdGlvbiBzZXRJZnJhbWVIZWlnaHQoaWZyYW1lKSB7XHJcbiAgICBpZiAoaWZyYW1lKSB7XHJcbiAgICAgICAgdmFyIGlmcmFtZVdpbiA9IGlmcmFtZS5jb250ZW50V2luZG93IHx8IGlmcmFtZS5jb250ZW50RG9jdW1lbnQucGFyZW50V2luZG93O1xyXG4gICAgICAgIGlmIChpZnJhbWVXaW4uZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICBpZnJhbWUuaGVpZ2h0ID0gaWZyYW1lV2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgfHwgaWZyYW1lV2luLmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFZ2dmViLkJ1aWxkZXIuaW5pdCgnZGVtby9wbGF5Z3JvdW5kL2luZGV4Lmh0bWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBWdnZlYi5HdWkuaW5pdCgpO1xyXG4gICAgVnZ2ZWIuRmlsZU1hbmFnZXIuaW5pdCgpO1xyXG4gICAgVnZ2ZWIuRmlsZU1hbmFnZXIuYWRkUGFnZXMocGFnZXMpO1xyXG4gICAgdmFyIHBhZ2UgPSBWdnZlYi5GaWxlTWFuYWdlci5nZXRQYWdlKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XHJcbiAgICBpZiAocGFnZSkge1xyXG4gICAgICAgIFZ2dmViLkJ1aWxkZXIuaW5pdChwYWdlLnVybCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFZ2dmViLkZpbGVNYW5hZ2VyLnNob3dBY3RpdmUocGFnZS5uYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5pbml0KHBhZ2VzWzBdLnVybCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFZ2dmViLkZpbGVNYW5hZ2VyLnNob3dBY3RpdmUocGFnZXNbMF0ubmFtZSk7XHJcbiAgICB9XHJcbn0pOyIsImNvbnN0IHBhZ2VzID0gW1xyXG4gICAgeyBuYW1lOiAnb2VlIHRlbXBsYXRlJywgdGl0bGU6ICdQRFMgVGVtcGxhdGUnLCB1cmw6ICd0ZW1wbGF0ZS9vZWUvaHRtbC9kZW1vL2RlbW8uaHRtbCd9LFxyXG4gICAgeyBuYW1lOiAndGVtcGxhdGUnLCB0aXRsZTogJ1RlbXBsYXRlJywgdXJsOiAnd2ViL2h0bWwvZGVtby9kZW1vLmh0bWwnIH0sXHJcbiAgICB7IG5hbWU6IFwicGxheWdyb3VuZFwiLCB0aXRsZTogXCJQbGF5Z3JvdW5kXCIsIHVybDogXCJkZW1vL3BsYXlncm91bmQvaW5kZXguaHRtbFwiIH1cclxuICAgIC8vIHsgbmFtZTogXCJuYXJyb3ctanVtYm90cm9uXCIsIHRpdGxlOiBcIkp1bWJvdHJvblwiLCB1cmw6IFwiZGVtby9uYXJyb3ctanVtYm90cm9uL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcImFsYnVtXCIsIHRpdGxlOiBcIkFsYnVtXCIsIHVybDogXCJkZW1vL2FsYnVtL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcImJsb2dcIiwgdGl0bGU6IFwiQmxvZ1wiLCB1cmw6IFwiZGVtby9ibG9nL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcImNhcm91c2VsXCIsIHRpdGxlOiBcIkNhcm91c2VsXCIsIHVybDogXCJkZW1vL2Nhcm91c2VsL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcIm9mZmNhbnZhc1wiLCB0aXRsZTogXCJPZmZjYW52YXNcIiwgdXJsOiBcImRlbW8vb2ZmY2FudmFzL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcInByaWNpbmdcIiwgdGl0bGU6IFwiUHJpY2luZ1wiLCB1cmw6IFwiZGVtby9wcmljaW5nL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgLy8geyBuYW1lOiBcInByb2R1Y3RcIiwgdGl0bGU6IFwiUHJvZHVjdFwiLCB1cmw6IFwiZGVtby9wcm9kdWN0L2luZGV4Lmh0bWxcIiB9IFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZXM7Il19
