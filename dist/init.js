require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({156:[function(require,module,exports){
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

},{"../js/jquery.min":1,"./builder":58,"./pages":179}],179:[function(require,module,exports){
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

},{}]},{},[156])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiLCJzcmNcXHBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUM7QUFDN0IsUUFBSSxNQUFKLEVBQVk7QUFDUixZQUFJLFlBQVksT0FBTyxhQUFQLElBQXdCLE9BQU8sZUFBUCxDQUF1QixZQUEvRDtBQUNBLFlBQUksVUFBVSxRQUFWLENBQW1CLElBQXZCLEVBQTZCO0FBQ3pCLG1CQUFPLE1BQVAsR0FBZ0IsVUFBVSxRQUFWLENBQW1CLGVBQW5CLENBQW1DLFlBQW5DLElBQW1ELFVBQVUsUUFBVixDQUFtQixJQUFuQixDQUF3QixZQUEzRjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxzQkFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzFCO0FBQ0E7O0FBRUEsc0JBQU0sR0FBTixDQUFVLElBQVY7QUFDQSxzQkFBTSxXQUFOLENBQWtCLElBQWxCO0FBQ0Esc0JBQU0sV0FBTixDQUFrQixRQUFsQixDQUEyQixlQUEzQjtBQUNBLFFBQUksT0FBTyxrQkFBTSxXQUFOLENBQWtCLE9BQWxCLENBQTBCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixJQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBbEQsQ0FBWDtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ04sMEJBQU0sT0FBTixDQUFjLElBQWQsQ0FBbUIsS0FBSyxHQUF4QixFQUE2QixZQUFZLENBQ3hDLENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixnQkFBTSxDQUFOLEVBQVMsR0FBNUIsRUFBaUMsWUFBWSxDQUM1QyxDQUREO0FBRUEsMEJBQU0sV0FBTixDQUFrQixVQUFsQixDQUE2QixnQkFBTSxDQUFOLEVBQVMsSUFBdEM7QUFDSDtBQUNKLENBakJEOzs7Ozs7QUNiQSxJQUFNLFFBQVEsQ0FDVixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sY0FBdEIsRUFBc0MsS0FBSyxrQ0FBM0MsRUFEVTtBQUVWO0FBQ0EsRUFBRSxNQUFNLFlBQVIsRUFBc0IsT0FBTyxZQUE3QixFQUEyQyxLQUFLO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEEsQ0FIVSxDQUFkOztrQkFhZSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWdnZlYiBmcm9tICcuL2J1aWxkZXInO1xyXG5pbXBvcnQgcGFnZXMgZnJvbSAnLi9wYWdlcyc7XHJcbmltcG9ydCAkIGZyb20gJy4uL2pzL2pxdWVyeS5taW4nO1xyXG5cclxuZnVuY3Rpb24gc2V0SWZyYW1lSGVpZ2h0KGlmcmFtZSkge1xyXG4gICAgaWYgKGlmcmFtZSkge1xyXG4gICAgICAgIHZhciBpZnJhbWVXaW4gPSBpZnJhbWUuY29udGVudFdpbmRvdyB8fCBpZnJhbWUuY29udGVudERvY3VtZW50LnBhcmVudFdpbmRvdztcclxuICAgICAgICBpZiAoaWZyYW1lV2luLmRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgaWZyYW1lLmhlaWdodCA9IGlmcmFtZVdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IGlmcmFtZVdpbi5kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBWdnZlYi5CdWlsZGVyLmluaXQoJ2RlbW8vcGxheWdyb3VuZC9pbmRleC5odG1sJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgVnZ2ZWIuR3VpLmluaXQoKTtcclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmluaXQoKTtcclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmFkZFBhZ2VzKHBhZ2VzKTtcclxuICAgIHZhciBwYWdlID0gVnZ2ZWIuRmlsZU1hbmFnZXIuZ2V0UGFnZSh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xyXG4gICAgaWYgKHBhZ2UpIHtcclxuICAgICAgICBWdnZlYi5CdWlsZGVyLmluaXQocGFnZS51cmwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICBWdnZlYi5GaWxlTWFuYWdlci5zaG93QWN0aXZlKHBhZ2UubmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIFZ2dmViLkJ1aWxkZXIuaW5pdChwYWdlc1swXS51cmwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICBWdnZlYi5GaWxlTWFuYWdlci5zaG93QWN0aXZlKHBhZ2VzWzBdLm5hbWUpO1xyXG4gICAgfVxyXG59KTsiLCJjb25zdCBwYWdlcyA9IFtcclxuICAgIHsgbmFtZTogJ3BkcycsIHRpdGxlOiAnUERTIFRlbXBsYXRlJywgdXJsOiAndGVtcGxhdGUvb2VlL2h0bWwvZGVtby9kZW1vLmh0bWwnfSxcclxuICAgIC8vIHsgbmFtZTogJ3Bkc19jb21tbycsIHRpdGxlOiAnUERTIENvbW1vbiBUZW1wbGF0ZScsIHVybDogJ3RlbXBsYXRlL29lZS9odG1sL2RlbW8vY29tbW9uX2RlbW8uaHRtbCcgfSxcclxuICAgIHsgbmFtZTogJ3BsYXlncm91bmQnLCB0aXRsZTogJ1BsYXlncm91bmQnLCB1cmw6ICdkZW1vL3BsYXlncm91bmQvaW5kZXguaHRtbCcgfVxyXG4gICAgLy8geyBuYW1lOiBcIm5hcnJvdy1qdW1ib3Ryb25cIiwgdGl0bGU6IFwiSnVtYm90cm9uXCIsIHVybDogXCJkZW1vL25hcnJvdy1qdW1ib3Ryb24vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYWxidW1cIiwgdGl0bGU6IFwiQWxidW1cIiwgdXJsOiBcImRlbW8vYWxidW0vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiYmxvZ1wiLCB0aXRsZTogXCJCbG9nXCIsIHVybDogXCJkZW1vL2Jsb2cvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwiY2Fyb3VzZWxcIiwgdGl0bGU6IFwiQ2Fyb3VzZWxcIiwgdXJsOiBcImRlbW8vY2Fyb3VzZWwvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwib2ZmY2FudmFzXCIsIHRpdGxlOiBcIk9mZmNhbnZhc1wiLCB1cmw6IFwiZGVtby9vZmZjYW52YXMvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJpY2luZ1wiLCB0aXRsZTogXCJQcmljaW5nXCIsIHVybDogXCJkZW1vL3ByaWNpbmcvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAvLyB7IG5hbWU6IFwicHJvZHVjdFwiLCB0aXRsZTogXCJQcm9kdWN0XCIsIHVybDogXCJkZW1vL3Byb2R1Y3QvaW5kZXguaHRtbFwiIH0gXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlczsiXX0=
