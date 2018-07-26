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

(0, _jquery2.default)(document).ready(function () {
    _builder2.default.Gui.init();
    _builder2.default.FileManager.init();
    var hash = window.location.hash && window.location.hash.substr(1);
    if (hash == _constants.importedPage) {
        localStorage.getItem(_constants.importedPage) && _pages2.default.unshift({
            name: _constants.importedPage,
            title: 'Imported Page',
            url: _jsoup.importedPageHref,
            srcdoc: (0, _htmlGenerator2.default)(localStorage.getItem(_constants.importedPage), _jsoup.generateDevDependentTags, _jsoup.generateBaseTag)
        });
    }
    _builder2.default.FileManager.addPages(_pages2.default);
    var page = _builder2.default.FileManager.getPage(hash);
    if (page) {
        _builder2.default.Builder.init(page.url, page.srcdoc, function () {});
        _builder2.default.FileManager.showActive(page.name);
    } else {
        _builder2.default.Builder.init(_pages2.default[0].url, _pages2.default[0].srcdoc, function () {});
        _builder2.default.FileManager.showActive(_pages2.default[0].name);
    }
});

},{"../js/jquery.min":1,"./builder":58,"./constants":154,"./pages":181,"./util/htmlGenerator":193,"./util/jsoup":194}],181:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiLCJzcmNcXHBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLHNCQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVk7QUFDMUIsc0JBQU0sR0FBTixDQUFVLElBQVY7QUFDQSxzQkFBTSxXQUFOLENBQWtCLElBQWxCO0FBQ0EsUUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixJQUFoQixJQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBckM7QUFDQSxRQUFJLFFBQVEsdUJBQVosRUFBMEI7QUFDdEIscUJBQWEsT0FBYixDQUFxQix1QkFBckIsS0FBc0MsZ0JBQU0sT0FBTixDQUFjO0FBQ2hELGtCQUFNLHVCQUQwQztBQUVoRCxtQkFBTyxlQUZ5QztBQUdoRCxpQkFBSyx1QkFIMkM7QUFJaEQsb0JBQVEsNkJBQWMsYUFBYSxPQUFiLENBQXFCLHVCQUFyQixDQUFkLEVBQWtELCtCQUFsRCxFQUE0RSxzQkFBNUU7QUFKd0MsU0FBZCxDQUF0QztBQU1IO0FBQ0Qsc0JBQU0sV0FBTixDQUFrQixRQUFsQixDQUEyQixlQUEzQjtBQUNBLFFBQUksT0FBTyxrQkFBTSxXQUFOLENBQWtCLE9BQWxCLENBQTBCLElBQTFCLENBQVg7QUFDQSxRQUFJLElBQUosRUFBVTtBQUNOLDBCQUFNLE9BQU4sQ0FBYyxJQUFkLENBQW1CLEtBQUssR0FBeEIsRUFBNkIsS0FBSyxNQUFsQyxFQUEwQyxZQUFZLENBQ3JELENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixnQkFBTSxDQUFOLEVBQVMsR0FBNUIsRUFBaUMsZ0JBQU0sQ0FBTixFQUFTLE1BQTFDLEVBQWtELFlBQVksQ0FDN0QsQ0FERDtBQUVBLDBCQUFNLFdBQU4sQ0FBa0IsVUFBbEIsQ0FBNkIsZ0JBQU0sQ0FBTixFQUFTLElBQXRDO0FBQ0g7QUFDSixDQXZCRDs7Ozs7O0FDUEEsSUFBTSxRQUFRLENBQ1YsRUFBRSxNQUFNLEtBQVIsRUFBZSxPQUFPLGNBQXRCLEVBQXNDLEtBQUssa0NBQTNDLEVBRFU7QUFFVjtBQUNBLEVBQUUsTUFBTSxZQUFSLEVBQXNCLE9BQU8sWUFBN0IsRUFBMkMsS0FBSztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBLENBSFUsQ0FBZDs7a0JBYWUsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi9idWlsZGVyJztcclxuaW1wb3J0IHBhZ2VzIGZyb20gJy4vcGFnZXMnO1xyXG5pbXBvcnQgJCBmcm9tICcuLi9qcy9qcXVlcnkubWluJztcclxuaW1wb3J0IHsgaW1wb3J0ZWRQYWdlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaHRtbEdlbmVyYXRvciBmcm9tICcuL3V0aWwvaHRtbEdlbmVyYXRvcic7XHJcbmltcG9ydCB7IGdlbmVyYXRlQmFzZVRhZywgaW1wb3J0ZWRQYWdlSHJlZiwgZ2VuZXJhdGVEZXZEZXBlbmRlbnRUYWdzIH0gZnJvbSAnLi91dGlsL2pzb3VwJztcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIFZ2dmViLkd1aS5pbml0KCk7XHJcbiAgICBWdnZlYi5GaWxlTWFuYWdlci5pbml0KCk7XHJcbiAgICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xyXG4gICAgaWYgKGhhc2ggPT0gaW1wb3J0ZWRQYWdlKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oaW1wb3J0ZWRQYWdlKSAmJiBwYWdlcy51bnNoaWZ0KHtcclxuICAgICAgICAgICAgbmFtZTogaW1wb3J0ZWRQYWdlLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0ltcG9ydGVkIFBhZ2UnLFxyXG4gICAgICAgICAgICB1cmw6IGltcG9ydGVkUGFnZUhyZWYsXHJcbiAgICAgICAgICAgIHNyY2RvYzogaHRtbEdlbmVyYXRvcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpbXBvcnRlZFBhZ2UpLCBnZW5lcmF0ZURldkRlcGVuZGVudFRhZ3MsIGdlbmVyYXRlQmFzZVRhZylcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmFkZFBhZ2VzKHBhZ2VzKTtcclxuICAgIHZhciBwYWdlID0gVnZ2ZWIuRmlsZU1hbmFnZXIuZ2V0UGFnZShoYXNoKTtcclxuICAgIGlmIChwYWdlKSB7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5pbml0KHBhZ2UudXJsLCBwYWdlLnNyY2RvYywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFZ2dmViLkZpbGVNYW5hZ2VyLnNob3dBY3RpdmUocGFnZS5uYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVnZ2ZWIuQnVpbGRlci5pbml0KHBhZ2VzWzBdLnVybCwgcGFnZXNbMF0uc3JjZG9jLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVnZ2ZWIuRmlsZU1hbmFnZXIuc2hvd0FjdGl2ZShwYWdlc1swXS5uYW1lKTtcclxuICAgIH1cclxufSk7IiwiY29uc3QgcGFnZXMgPSBbXHJcbiAgICB7IG5hbWU6ICdwZHMnLCB0aXRsZTogJ1BEUyBUZW1wbGF0ZScsIHVybDogJ3RlbXBsYXRlL29lZS9odG1sL2RlbW8vZGVtby5odG1sJyB9LFxyXG4gICAgLy8geyBuYW1lOiAncGRzX2NvbW1vJywgdGl0bGU6ICdQRFMgQ29tbW9uIFRlbXBsYXRlJywgdXJsOiAndGVtcGxhdGUvb2VlL2h0bWwvZGVtby9jb21tb25fZGVtby5odG1sJyB9LFxyXG4gICAgeyBuYW1lOiAncGxheWdyb3VuZCcsIHRpdGxlOiAnUGxheWdyb3VuZCcsIHVybDogJ2RlbW8vcGxheWdyb3VuZC9pbmRleC5odG1sJyB9XHJcbiAgICAvLyB7IG5hbWU6IFwibmFycm93LWp1bWJvdHJvblwiLCB0aXRsZTogXCJKdW1ib3Ryb25cIiwgdXJsOiBcImRlbW8vbmFycm93LWp1bWJvdHJvbi9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJhbGJ1bVwiLCB0aXRsZTogXCJBbGJ1bVwiLCB1cmw6IFwiZGVtby9hbGJ1bS9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJibG9nXCIsIHRpdGxlOiBcIkJsb2dcIiwgdXJsOiBcImRlbW8vYmxvZy9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJjYXJvdXNlbFwiLCB0aXRsZTogXCJDYXJvdXNlbFwiLCB1cmw6IFwiZGVtby9jYXJvdXNlbC9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJvZmZjYW52YXNcIiwgdGl0bGU6IFwiT2ZmY2FudmFzXCIsIHVybDogXCJkZW1vL29mZmNhbnZhcy9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJwcmljaW5nXCIsIHRpdGxlOiBcIlByaWNpbmdcIiwgdXJsOiBcImRlbW8vcHJpY2luZy9pbmRleC5odG1sXCIgfSxcclxuICAgIC8vIHsgbmFtZTogXCJwcm9kdWN0XCIsIHRpdGxlOiBcIlByb2R1Y3RcIiwgdXJsOiBcImRlbW8vcHJvZHVjdC9pbmRleC5odG1sXCIgfSBcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2VzOyJdfQ==
