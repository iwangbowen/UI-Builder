require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    $(document).ready(function () {
        $('#menu-panel .navbar-nav a').on('click', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#left-panel').toggle();
                $('#right-panel').toggle();
            }
        });

        var isElementCreated = false;
        var $element = void 0;
        var draggableElements = '#components-list li ol li';

        document.querySelector('iframe').onload = function (event) {
            window.interact = frames[0].interact;
            setInteractables();
        };

        var setInteractables = function setInteractables() {
            interact(draggableElements, { context: document }).draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: document.getElementById('iframeId').contentWindow.document.body,
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: function onmove(event) {
                    if (!isElementCreated) {
                        var component = _builder2.default.Components.get($(event.target).data("type"));
                        var html = component.dragHtml || component.html;

                        $element = $(html).appendTo($('body'));
                        var display = $element.css('display');
                        if (display == 'inline-block') {
                            $element.css({
                                position: 'absolute',
                                left: event.pageX - $element.outerWidth() / 2,
                                top: event.pageY - $element.outerHeight() / 2,
                                'z-index': 999
                            });
                        } else {
                            $element.css({
                                position: 'absolute',
                                left: event.pageX - 20,
                                top: event.pageY - 20,
                                'z-index': 999
                            });
                        }

                        isElementCreated = true;
                    }

                    var x = (parseFloat($element.attr('data-x')) || 0) + event.dx,
                        y = (parseFloat($element.attr('data-y')) || 0) + event.dy;

                    $element.css({
                        transform: 'translate(' + x + 'px, ' + y + 'px)'
                    }).attr({
                        'data-x': x,
                        'data-y': y
                    });
                },
                // call this function on every dragend event
                onend: function onend(event) {
                    var left = $element.offset().left - $('#iframeId').offset().left,
                        top = $element.offset().top - $('#iframeId').offset().top;
                    $element.css({
                        left: left,
                        top: top,
                        transform: ''
                    }).removeAttr('data-x data-y');

                    isElementCreated = false;
                    // 直接替换元素会有拖动问题，可能是因为元素本身在父页面，所以包含一些特殊属性有关
                    // 获得html字符串，然后再进行替换
                    self.frameBody.append($element.prop("outerHTML"));
                    // self.dragElement && self.dragElement.replaceWith($element.prop("outerHTML"));
                    $element.remove();
                }
            });
        };
    });
})();

},{"./builder":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGRyYWctbi1kcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBLENBQUMsWUFBWTtBQUNULE1BQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTtBQUNwQixVQUFFLDJCQUFGLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFlBQVk7QUFDbkQsZ0JBQUksQ0FBQyxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCLENBQUwsRUFBaUM7QUFDN0Isa0JBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxrQkFBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixXQUFuQixDQUErQixRQUEvQjtBQUNBLGtCQUFFLGFBQUYsRUFBaUIsTUFBakI7QUFDQSxrQkFBRSxjQUFGLEVBQWtCLE1BQWxCO0FBQ0g7QUFDSixTQVBEOztBQVNBLFlBQUksbUJBQW1CLEtBQXZCO0FBQ0EsWUFBSSxpQkFBSjtBQUNBLFlBQU0sb0JBQW9CLDJCQUExQjs7QUFFQSxpQkFBUyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLE1BQWpDLEdBQTBDLFVBQVUsS0FBVixFQUFpQjtBQUN2RCxtQkFBTyxRQUFQLEdBQWtCLE9BQU8sQ0FBUCxFQUFVLFFBQTVCO0FBQ0E7QUFDSCxTQUhEOztBQUtBLFlBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQixHQUFNO0FBQzNCLHFCQUFTLGlCQUFULEVBQTRCLEVBQUUsU0FBUyxRQUFYLEVBQTVCLEVBQ0ssU0FETCxDQUNlO0FBQ1A7QUFDQSx5QkFBUyxJQUZGO0FBR1A7QUFDQSwwQkFBVTtBQUNOLGlDQUFhLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxhQUFwQyxDQUFrRCxRQUFsRCxDQUEyRCxJQURsRTtBQUVOLDZCQUFTLElBRkg7QUFHTixpQ0FBYSxFQUFFLEtBQUssQ0FBUCxFQUFVLE1BQU0sQ0FBaEIsRUFBbUIsUUFBUSxDQUEzQixFQUE4QixPQUFPLENBQXJDO0FBSFAsaUJBSkg7QUFTUDtBQUNBLDRCQUFZLElBVkw7O0FBWVA7QUFDQSx3QkFBUSx1QkFBUztBQUNiLHdCQUFJLENBQUMsZ0JBQUwsRUFBdUI7QUFDbkIsNEJBQU0sWUFBWSxrQkFBTSxVQUFOLENBQWlCLEdBQWpCLENBQXFCLEVBQUUsTUFBTSxNQUFSLEVBQWdCLElBQWhCLENBQXFCLE1BQXJCLENBQXJCLENBQWxCO0FBQ0EsNEJBQU0sT0FBTyxVQUFVLFFBQVYsSUFBc0IsVUFBVSxJQUE3Qzs7QUFFQSxtQ0FBVyxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLEVBQUUsTUFBRixDQUFqQixDQUFYO0FBQ0EsNEJBQU0sVUFBVSxTQUFTLEdBQVQsQ0FBYSxTQUFiLENBQWhCO0FBQ0EsNEJBQUksV0FBVyxjQUFmLEVBQStCO0FBQzNCLHFDQUFTLEdBQVQsQ0FBYTtBQUNULDBDQUFVLFVBREQ7QUFFVCxzQ0FBTSxNQUFNLEtBQU4sR0FBYyxTQUFTLFVBQVQsS0FBd0IsQ0FGbkM7QUFHVCxxQ0FBSyxNQUFNLEtBQU4sR0FBYyxTQUFTLFdBQVQsS0FBeUIsQ0FIbkM7QUFJVCwyQ0FBVztBQUpGLDZCQUFiO0FBTUgseUJBUEQsTUFPTztBQUNILHFDQUFTLEdBQVQsQ0FBYTtBQUNULDBDQUFVLFVBREQ7QUFFVCxzQ0FBTSxNQUFNLEtBQU4sR0FBYyxFQUZYO0FBR1QscUNBQUssTUFBTSxLQUFOLEdBQWMsRUFIVjtBQUlULDJDQUFXO0FBSkYsNkJBQWI7QUFNSDs7QUFFRCwyQ0FBbUIsSUFBbkI7QUFDSDs7QUFFRCx3QkFBTSxJQUFJLENBQUMsV0FBVyxTQUFTLElBQVQsQ0FBYyxRQUFkLENBQVgsS0FBdUMsQ0FBeEMsSUFBNkMsTUFBTSxFQUE3RDtBQUFBLHdCQUNJLElBQUksQ0FBQyxXQUFXLFNBQVMsSUFBVCxDQUFjLFFBQWQsQ0FBWCxLQUF1QyxDQUF4QyxJQUE2QyxNQUFNLEVBRDNEOztBQUdBLDZCQUNLLEdBREwsQ0FDUztBQUNELGtEQUF3QixDQUF4QixZQUFnQyxDQUFoQztBQURDLHFCQURULEVBSUssSUFKTCxDQUlVO0FBQ0Ysa0NBQVUsQ0FEUjtBQUVGLGtDQUFVO0FBRlIscUJBSlY7QUFRSCxpQkFsRE07QUFtRFA7QUFDQSx1QkFBTyxzQkFBUztBQUNaLHdCQUFNLE9BQU8sU0FBUyxNQUFULEdBQWtCLElBQWxCLEdBQXlCLEVBQUUsV0FBRixFQUFlLE1BQWYsR0FBd0IsSUFBOUQ7QUFBQSx3QkFDSSxNQUFNLFNBQVMsTUFBVCxHQUFrQixHQUFsQixHQUF3QixFQUFFLFdBQUYsRUFBZSxNQUFmLEdBQXdCLEdBRDFEO0FBRUEsNkJBQ0ssR0FETCxDQUNTO0FBQ0Qsa0NBREM7QUFFRCxnQ0FGQztBQUdELG1DQUFXO0FBSFYscUJBRFQsRUFLTyxVQUxQLENBS2tCLGVBTGxCOztBQU9BLHVDQUFtQixLQUFuQjtBQUNBO0FBQ0E7QUFDQSx5QkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixTQUFTLElBQVQsQ0FBYyxXQUFkLENBQXRCO0FBQ0E7QUFDQSw2QkFBUyxNQUFUO0FBQ0g7QUFwRU0sYUFEZjtBQXVFSCxTQXhFRDtBQXlFSCxLQTVGRDtBQTZGSCxDQTlGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi9idWlsZGVyJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgJCgnI21lbnUtcGFuZWwgLm5hdmJhci1uYXYgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnI2xlZnQtcGFuZWwnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyNyaWdodC1wYW5lbCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBpc0VsZW1lbnRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0ICRlbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnRzID0gJyNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGknO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKS5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgd2luZG93LmludGVyYWN0ID0gZnJhbWVzWzBdLmludGVyYWN0O1xyXG4gICAgICAgICAgICBzZXRJbnRlcmFjdGFibGVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2V0SW50ZXJhY3RhYmxlcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgaW50ZXJhY3QoZHJhZ2dhYmxlRWxlbWVudHMsIHsgY29udGV4dDogZG9jdW1lbnQgfSlcclxuICAgICAgICAgICAgICAgIC5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuYWJsZSBpbmVydGlhbCB0aHJvd2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGFyZWEgb2YgaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICByZXN0cmljdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50UmVjdDogeyB0b3A6IDAsIGxlZnQ6IDAsIGJvdHRvbTogMSwgcmlnaHQ6IDEgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5hYmxlIGF1dG9TY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvU2Nyb2xsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ21vdmUgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBvbm1vdmU6IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0VsZW1lbnRDcmVhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldCgkKGV2ZW50LnRhcmdldCkuZGF0YShcInR5cGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGNvbXBvbmVudC5kcmFnSHRtbCB8fCBjb21wb25lbnQuaHRtbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICQoaHRtbCkuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5ID09ICdpbmxpbmUtYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LnBhZ2VYIC0gJGVsZW1lbnQub3V0ZXJXaWR0aCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBldmVudC5wYWdlWSAtICRlbGVtZW50Lm91dGVySGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IDk5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZXZlbnQucGFnZVggLSAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBldmVudC5wYWdlWSAtIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IDk5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRWxlbWVudENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gKHBhcnNlRmxvYXQoJGVsZW1lbnQuYXR0cignZGF0YS14JykpIHx8IDApICsgZXZlbnQuZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gKHBhcnNlRmxvYXQoJGVsZW1lbnQuYXR0cignZGF0YS15JykpIHx8IDApICsgZXZlbnQuZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEteCc6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEteSc6IHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIG9uIGV2ZXJ5IGRyYWdlbmQgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBvbmVuZDogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gJGVsZW1lbnQub2Zmc2V0KCkubGVmdCAtICQoJyNpZnJhbWVJZCcpLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAkZWxlbWVudC5vZmZzZXQoKS50b3AgLSAkKCcjaWZyYW1lSWQnKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5yZW1vdmVBdHRyKCdkYXRhLXggZGF0YS15Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VsZW1lbnRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeabv+aNouWFg+e0oOS8muacieaLluWKqOmXrumimO+8jOWPr+iDveaYr+WboOS4uuWFg+e0oOacrOi6q+WcqOeItumhtemdou+8jOaJgOS7peWMheWQq+S4gOS6m+eJueauiuWxnuaAp+acieWFs1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflvpdodG1s5a2X56ym5Liy77yM54S25ZCO5YaN6L+b6KGM5pu/5o2iXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnJhbWVCb2R5LmFwcGVuZCgkZWxlbWVudC5wcm9wKFwib3V0ZXJIVE1MXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi5kcmFnRWxlbWVudCAmJiBzZWxmLmRyYWdFbGVtZW50LnJlcGxhY2VXaXRoKCRlbGVtZW50LnByb3AoXCJvdXRlckhUTUxcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn0pKCk7Il19
