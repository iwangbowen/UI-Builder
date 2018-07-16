require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({148:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};

$(document).ready(function () {
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

},{"./builder":52,"./pages":171}],171:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
var pages = [{ name: 'oee template', title: 'OEE Template', url: 'template/oee/html/demo/demo.html' }, { name: 'template', title: 'Template', url: 'web/html/demo/demo.html' }, { name: "playground", title: "Playground", url: "demo/playground/index.html"
    // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
    // { name: "album", title: "Album", url: "demo/album/index.html" },
    // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
    // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
    // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
    // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
    // { name: "product", title: "Product", url: "demo/product/index.html" } 
}];

exports.default = pages;

},{}]},{},[148])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiLCJzcmNcXHBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQXlCLE1BQXpCLEVBQWlDO0FBQzdCLFFBQUksTUFBSixFQUFZO0FBQ1IsWUFBSSxZQUFZLE9BQU8sYUFBUCxJQUF3QixPQUFPLGVBQVAsQ0FBdUIsWUFBL0Q7QUFDQSxZQUFJLFVBQVUsUUFBVixDQUFtQixJQUF2QixFQUE2QjtBQUN6QixtQkFBTyxNQUFQLEdBQWdCLFVBQVUsUUFBVixDQUFtQixlQUFuQixDQUFtQyxZQUFuQyxJQUFtRCxVQUFVLFFBQVYsQ0FBbUIsSUFBbkIsQ0FBd0IsWUFBM0Y7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzFCO0FBQ0E7O0FBRUEsc0JBQU0sR0FBTixDQUFVLElBQVY7QUFDQSxzQkFBTSxXQUFOLENBQWtCLElBQWxCO0FBQ0Esc0JBQU0sV0FBTixDQUFrQixRQUFsQixDQUEyQixlQUEzQjtBQUNBLFFBQUksT0FBTyxrQkFBTSxXQUFOLENBQWtCLE9BQWxCLENBQTBCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixJQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBbEQsQ0FBWDtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ04sMEJBQU0sT0FBTixDQUFjLElBQWQsQ0FBbUIsS0FBSyxHQUF4QixFQUE2QixZQUFZLENBQ3hDLENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixnQkFBTSxDQUFOLEVBQVMsR0FBNUIsRUFBaUMsWUFBWSxDQUM1QyxDQUREO0FBRUEsMEJBQU0sV0FBTixDQUFrQixVQUFsQixDQUE2QixnQkFBTSxDQUFOLEVBQVMsSUFBdEM7QUFDSDtBQUNKLENBakJEOzs7Ozs7QUNaQSxJQUFNLFFBQVEsQ0FDVixFQUFFLE1BQU0sY0FBUixFQUF3QixPQUFPLGNBQS9CLEVBQStDLEtBQUssa0NBQXBELEVBRFUsRUFFVixFQUFFLE1BQU0sVUFBUixFQUFvQixPQUFPLFVBQTNCLEVBQXVDLEtBQUsseUJBQTVDLEVBRlUsRUFHVixFQUFFLE1BQU0sWUFBUixFQUFzQixPQUFPLFlBQTdCLEVBQTJDLEtBQUs7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQSxDQUhVLENBQWQ7O2tCQWFlLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuL3BhZ2VzJztcclxuXHJcbmZ1bmN0aW9uIHNldElmcmFtZUhlaWdodChpZnJhbWUpIHtcclxuICAgIGlmIChpZnJhbWUpIHtcclxuICAgICAgICB2YXIgaWZyYW1lV2luID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5wYXJlbnRXaW5kb3c7XHJcbiAgICAgICAgaWYgKGlmcmFtZVdpbi5kb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgIGlmcmFtZS5oZWlnaHQgPSBpZnJhbWVXaW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBpZnJhbWVXaW4uZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gVnZ2ZWIuQnVpbGRlci5pbml0KCdkZW1vL3BsYXlncm91bmQvaW5kZXguaHRtbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIFZ2dmViLkd1aS5pbml0KCk7XHJcbiAgICBWdnZlYi5GaWxlTWFuYWdlci5pbml0KCk7XHJcbiAgICBWdnZlYi5GaWxlTWFuYWdlci5hZGRQYWdlcyhwYWdlcyk7XHJcbiAgICB2YXIgcGFnZSA9IFZ2dmViLkZpbGVNYW5hZ2VyLmdldFBhZ2Uod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcclxuICAgIGlmIChwYWdlKSB7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5pbml0KHBhZ2UudXJsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVnZ2ZWIuRmlsZU1hbmFnZXIuc2hvd0FjdGl2ZShwYWdlLm5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBWdnZlYi5CdWlsZGVyLmluaXQocGFnZXNbMF0udXJsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVnZ2ZWIuRmlsZU1hbmFnZXIuc2hvd0FjdGl2ZShwYWdlc1swXS5uYW1lKTtcclxuICAgIH1cclxufSk7IiwiY29uc3QgcGFnZXMgPSBbXHJcbiAgICB7IG5hbWU6ICdvZWUgdGVtcGxhdGUnLCB0aXRsZTogJ09FRSBUZW1wbGF0ZScsIHVybDogJ3RlbXBsYXRlL29lZS9odG1sL2RlbW8vZGVtby5odG1sJ30sXHJcbiAgICB7IG5hbWU6ICd0ZW1wbGF0ZScsIHRpdGxlOiAnVGVtcGxhdGUnLCB1cmw6ICd3ZWIvaHRtbC9kZW1vL2RlbW8uaHRtbCcgfSxcclxuICAgIHsgbmFtZTogXCJwbGF5Z3JvdW5kXCIsIHRpdGxlOiBcIlBsYXlncm91bmRcIiwgdXJsOiBcImRlbW8vcGxheWdyb3VuZC9pbmRleC5odG1sXCIgfVxyXG4gICAgLy8geyBuYW1lOiBcIm5hcnJvdy1qdW1ib3Ryb25cIiwgdGl0bGU6IFwiSnVtYm90cm9uXCIsIHVybDogXCJkZW1vL25hcnJvdy1qdW1ib3Ryb24vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYWxidW1cIiwgdGl0bGU6IFwiQWxidW1cIiwgdXJsOiBcImRlbW8vYWxidW0vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYmxvZ1wiLCB0aXRsZTogXCJCbG9nXCIsIHVybDogXCJkZW1vL2Jsb2cvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiY2Fyb3VzZWxcIiwgdGl0bGU6IFwiQ2Fyb3VzZWxcIiwgdXJsOiBcImRlbW8vY2Fyb3VzZWwvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwib2ZmY2FudmFzXCIsIHRpdGxlOiBcIk9mZmNhbnZhc1wiLCB1cmw6IFwiZGVtby9vZmZjYW52YXMvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJpY2luZ1wiLCB0aXRsZTogXCJQcmljaW5nXCIsIHVybDogXCJkZW1vL3ByaWNpbmcvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJvZHVjdFwiLCB0aXRsZTogXCJQcm9kdWN0XCIsIHVybDogXCJkZW1vL3Byb2R1Y3QvaW5kZXguaHRtbFwiIH0gXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlczsiXX0=
