require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({4:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

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
    var pages = [{ name: 'oee template', title: 'OEE Template', url: 'template/oee/html/demo/demo.html' }, { name: 'template', title: 'Template', url: 'web/html/demo/demo.html' }, { name: "playground", title: "Playground", url: "demo/playground/index.html"
        // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
        // { name: "album", title: "Album", url: "demo/album/index.html" },
        // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
        // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
        // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
        // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
        // { name: "product", title: "Product", url: "demo/product/index.html" } 
    }];
    // Vvveb.Builder.init('demo/playground/index.html', function () {
    // });

    _builder2.default.Gui.init();
    _builder2.default.FileManager.init();
    _builder2.default.FileManager.addPages(pages);
    var page = _builder2.default.FileManager.getPage(window.location.hash && window.location.hash.substr(1));
    if (page) {
        _builder2.default.Builder.init(page.url, function () {});
        _builder2.default.FileManager.showActive(page.name);
    } else {
        _builder2.default.Builder.init(pages[0].url, function () {});
        _builder2.default.FileManager.showActive(pages[0].name);
    }
});

},{"./builder":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGluaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQXlCLE1BQXpCLEVBQWlDO0FBQzdCLFFBQUksTUFBSixFQUFZO0FBQ1IsWUFBSSxZQUFZLE9BQU8sYUFBUCxJQUF3QixPQUFPLGVBQVAsQ0FBdUIsWUFBL0Q7QUFDQSxZQUFJLFVBQVUsUUFBVixDQUFtQixJQUF2QixFQUE2QjtBQUN6QixtQkFBTyxNQUFQLEdBQWdCLFVBQVUsUUFBVixDQUFtQixlQUFuQixDQUFtQyxZQUFuQyxJQUFtRCxVQUFVLFFBQVYsQ0FBbUIsSUFBbkIsQ0FBd0IsWUFBM0Y7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzFCLFFBQUksUUFBUSxDQUNSLEVBQUUsTUFBTSxjQUFSLEVBQXdCLE9BQU8sY0FBL0IsRUFBK0MsS0FBSyxrQ0FBcEQsRUFEUSxFQUVSLEVBQUUsTUFBTSxVQUFSLEVBQW9CLE9BQU8sVUFBM0IsRUFBdUMsS0FBSyx5QkFBNUMsRUFGUSxFQUdSLEVBQUUsTUFBTSxZQUFSLEVBQXNCLE9BQU8sWUFBN0IsRUFBMkMsS0FBSztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBLEtBSFEsQ0FBWjtBQVlBO0FBQ0E7O0FBRUEsc0JBQU0sR0FBTixDQUFVLElBQVY7QUFDQSxzQkFBTSxXQUFOLENBQWtCLElBQWxCO0FBQ0Esc0JBQU0sV0FBTixDQUFrQixRQUFsQixDQUEyQixLQUEzQjtBQUNBLFFBQUksT0FBTyxrQkFBTSxXQUFOLENBQWtCLE9BQWxCLENBQTBCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixJQUF3QixPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBNEIsQ0FBNUIsQ0FBbEQsQ0FBWDtBQUNBLFFBQUksSUFBSixFQUFVO0FBQ04sMEJBQU0sT0FBTixDQUFjLElBQWQsQ0FBbUIsS0FBSyxHQUF4QixFQUE2QixZQUFZLENBQ3hDLENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLEtBQUssSUFBbEM7QUFDSCxLQUpELE1BSU87QUFDSCwwQkFBTSxPQUFOLENBQWMsSUFBZCxDQUFtQixNQUFNLENBQU4sRUFBUyxHQUE1QixFQUFpQyxZQUFZLENBQzVDLENBREQ7QUFFQSwwQkFBTSxXQUFOLENBQWtCLFVBQWxCLENBQTZCLE1BQU0sQ0FBTixFQUFTLElBQXRDO0FBQ0g7QUFDSixDQTdCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi9idWlsZGVyJztcclxuXHJcbmZ1bmN0aW9uIHNldElmcmFtZUhlaWdodChpZnJhbWUpIHtcclxuICAgIGlmIChpZnJhbWUpIHtcclxuICAgICAgICB2YXIgaWZyYW1lV2luID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5wYXJlbnRXaW5kb3c7XHJcbiAgICAgICAgaWYgKGlmcmFtZVdpbi5kb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgIGlmcmFtZS5oZWlnaHQgPSBpZnJhbWVXaW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBpZnJhbWVXaW4uZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBhZ2VzID0gW1xyXG4gICAgICAgIHsgbmFtZTogJ29lZSB0ZW1wbGF0ZScsIHRpdGxlOiAnT0VFIFRlbXBsYXRlJywgdXJsOiAndGVtcGxhdGUvb2VlL2h0bWwvZGVtby9kZW1vLmh0bWwnfSxcclxuICAgICAgICB7IG5hbWU6ICd0ZW1wbGF0ZScsIHRpdGxlOiAnVGVtcGxhdGUnLCB1cmw6ICd3ZWIvaHRtbC9kZW1vL2RlbW8uaHRtbCcgfSxcclxuICAgICAgICB7IG5hbWU6IFwicGxheWdyb3VuZFwiLCB0aXRsZTogXCJQbGF5Z3JvdW5kXCIsIHVybDogXCJkZW1vL3BsYXlncm91bmQvaW5kZXguaHRtbFwiIH1cclxuICAgICAgICAvLyB7IG5hbWU6IFwibmFycm93LWp1bWJvdHJvblwiLCB0aXRsZTogXCJKdW1ib3Ryb25cIiwgdXJsOiBcImRlbW8vbmFycm93LWp1bWJvdHJvbi9pbmRleC5odG1sXCIgfSxcclxuICAgICAgICAvLyB7IG5hbWU6IFwiYWxidW1cIiwgdGl0bGU6IFwiQWxidW1cIiwgdXJsOiBcImRlbW8vYWxidW0vaW5kZXguaHRtbFwiIH0sXHJcbiAgICAgICAgLy8geyBuYW1lOiBcImJsb2dcIiwgdGl0bGU6IFwiQmxvZ1wiLCB1cmw6IFwiZGVtby9ibG9nL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogXCJjYXJvdXNlbFwiLCB0aXRsZTogXCJDYXJvdXNlbFwiLCB1cmw6IFwiZGVtby9jYXJvdXNlbC9pbmRleC5odG1sXCIgfSxcclxuICAgICAgICAvLyB7IG5hbWU6IFwib2ZmY2FudmFzXCIsIHRpdGxlOiBcIk9mZmNhbnZhc1wiLCB1cmw6IFwiZGVtby9vZmZjYW52YXMvaW5kZXguaHRtbFwiIH0sXHJcbiAgICAgICAgLy8geyBuYW1lOiBcInByaWNpbmdcIiwgdGl0bGU6IFwiUHJpY2luZ1wiLCB1cmw6IFwiZGVtby9wcmljaW5nL2luZGV4Lmh0bWxcIiB9LFxyXG4gICAgICAgIC8vIHsgbmFtZTogXCJwcm9kdWN0XCIsIHRpdGxlOiBcIlByb2R1Y3RcIiwgdXJsOiBcImRlbW8vcHJvZHVjdC9pbmRleC5odG1sXCIgfSBcclxuICAgIF07XHJcbiAgICAvLyBWdnZlYi5CdWlsZGVyLmluaXQoJ2RlbW8vcGxheWdyb3VuZC9pbmRleC5odG1sJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgVnZ2ZWIuR3VpLmluaXQoKTtcclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmluaXQoKTtcclxuICAgIFZ2dmViLkZpbGVNYW5hZ2VyLmFkZFBhZ2VzKHBhZ2VzKTtcclxuICAgIHZhciBwYWdlID0gVnZ2ZWIuRmlsZU1hbmFnZXIuZ2V0UGFnZSh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xyXG4gICAgaWYgKHBhZ2UpIHtcclxuICAgICAgICBWdnZlYi5CdWlsZGVyLmluaXQocGFnZS51cmwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICBWdnZlYi5GaWxlTWFuYWdlci5zaG93QWN0aXZlKHBhZ2UubmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIFZ2dmViLkJ1aWxkZXIuaW5pdChwYWdlc1swXS51cmwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICBWdnZlYi5GaWxlTWFuYWdlci5zaG93QWN0aXZlKHBhZ2VzWzBdLm5hbWUpO1xyXG4gICAgfVxyXG59KTsiXX0=
