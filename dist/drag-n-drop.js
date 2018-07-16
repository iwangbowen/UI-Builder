require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({143:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                isElementCreated = false;
                // 直接替换元素会有拖动问题，可能是因为元素本身在父页面，所以包含一些特殊属性有关
                // 获得html字符串，然后再进行替换
                self.frameBody.append($element.prop("outerHTML"));
                var appendedElement = self.frameBody.children('body > *:last');
                appendedElement.css({
                    transform: '',
                    left: '',
                    top: ''
                }).offset({
                    left: left,
                    top: top
                }).removeAttr('data-x data-y');
                $element.remove();
            }
        });
    };
});

},{"./builder":52}]},{},[143])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGRyYWctbi1kcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTtBQUNwQixNQUFFLDJCQUFGLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFlBQVk7QUFDbkQsWUFBSSxDQUFDLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakIsQ0FBTCxFQUFpQztBQUM3QixjQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0EsY0FBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixXQUFuQixDQUErQixRQUEvQjtBQUNBLGNBQUUsYUFBRixFQUFpQixNQUFqQjtBQUNBLGNBQUUsY0FBRixFQUFrQixNQUFsQjtBQUNIO0FBQ0osS0FQRDs7QUFTQSxRQUFJLG1CQUFtQixLQUF2QjtBQUNBLFFBQUksaUJBQUo7QUFDQSxRQUFNLG9CQUFvQiwyQkFBMUI7O0FBRUEsYUFBUyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLE1BQWpDLEdBQTBDLFVBQVUsS0FBVixFQUFpQjtBQUN2RCxlQUFPLFFBQVAsR0FBa0IsT0FBTyxDQUFQLEVBQVUsUUFBNUI7QUFDQTtBQUNILEtBSEQ7O0FBS0EsUUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQU07QUFDM0IsaUJBQVMsaUJBQVQsRUFBNEIsRUFBRSxTQUFTLFFBQVgsRUFBNUIsRUFDSyxTQURMLENBQ2U7QUFDUDtBQUNBLHFCQUFTLElBRkY7QUFHUDtBQUNBLHNCQUFVO0FBQ04sNkJBQWEsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLGFBQXBDLENBQWtELFFBQWxELENBQTJELElBRGxFO0FBRU4seUJBQVMsSUFGSDtBQUdOLDZCQUFhLEVBQUUsS0FBSyxDQUFQLEVBQVUsTUFBTSxDQUFoQixFQUFtQixRQUFRLENBQTNCLEVBQThCLE9BQU8sQ0FBckM7QUFIUCxhQUpIO0FBU1A7QUFDQSx3QkFBWSxJQVZMOztBQVlQO0FBQ0Esb0JBQVEsdUJBQVM7QUFDYixvQkFBSSxDQUFDLGdCQUFMLEVBQXVCO0FBQ25CLHdCQUFNLFlBQVksa0JBQU0sVUFBTixDQUFpQixHQUFqQixDQUFxQixFQUFFLE1BQU0sTUFBUixFQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUFyQixDQUFsQjtBQUNBLHdCQUFNLE9BQU8sVUFBVSxRQUFWLElBQXNCLFVBQVUsSUFBN0M7O0FBRUEsK0JBQVcsRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixFQUFFLE1BQUYsQ0FBakIsQ0FBWDtBQUNBLHdCQUFNLFVBQVUsU0FBUyxHQUFULENBQWEsU0FBYixDQUFoQjtBQUNBLHdCQUFJLFdBQVcsY0FBZixFQUErQjtBQUMzQixpQ0FBUyxHQUFULENBQWE7QUFDVCxzQ0FBVSxVQUREO0FBRVQsa0NBQU0sTUFBTSxLQUFOLEdBQWMsU0FBUyxVQUFULEtBQXdCLENBRm5DO0FBR1QsaUNBQUssTUFBTSxLQUFOLEdBQWMsU0FBUyxXQUFULEtBQXlCLENBSG5DO0FBSVQsdUNBQVc7QUFKRix5QkFBYjtBQU1ILHFCQVBELE1BT087QUFDSCxpQ0FBUyxHQUFULENBQWE7QUFDVCxzQ0FBVSxVQUREO0FBRVQsa0NBQU0sTUFBTSxLQUFOLEdBQWMsRUFGWDtBQUdULGlDQUFLLE1BQU0sS0FBTixHQUFjLEVBSFY7QUFJVCx1Q0FBVztBQUpGLHlCQUFiO0FBTUg7O0FBRUQsdUNBQW1CLElBQW5CO0FBQ0g7O0FBRUQsb0JBQU0sSUFBSSxDQUFDLFdBQVcsU0FBUyxJQUFULENBQWMsUUFBZCxDQUFYLEtBQXVDLENBQXhDLElBQTZDLE1BQU0sRUFBN0Q7QUFBQSxvQkFDSSxJQUFJLENBQUMsV0FBVyxTQUFTLElBQVQsQ0FBYyxRQUFkLENBQVgsS0FBdUMsQ0FBeEMsSUFBNkMsTUFBTSxFQUQzRDs7QUFHQSx5QkFDSyxHQURMLENBQ1M7QUFDRCw4Q0FBd0IsQ0FBeEIsWUFBZ0MsQ0FBaEM7QUFEQyxpQkFEVCxFQUlLLElBSkwsQ0FJVTtBQUNGLDhCQUFVLENBRFI7QUFFRiw4QkFBVTtBQUZSLGlCQUpWO0FBUUgsYUFsRE07QUFtRFA7QUFDQSxtQkFBTyxzQkFBUztBQUNaLG9CQUFNLE9BQU8sU0FBUyxNQUFULEdBQWtCLElBQWxCLEdBQXlCLEVBQUUsV0FBRixFQUFlLE1BQWYsR0FBd0IsSUFBOUQ7QUFBQSxvQkFDSSxNQUFNLFNBQVMsTUFBVCxHQUFrQixHQUFsQixHQUF3QixFQUFFLFdBQUYsRUFBZSxNQUFmLEdBQXdCLEdBRDFEO0FBRUEsbUNBQW1CLEtBQW5CO0FBQ0E7QUFDQTtBQUNBLHFCQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBdEI7QUFDQSxvQkFBTSxrQkFBa0IsS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixlQUF4QixDQUF4QjtBQUNBLGdDQUNLLEdBREwsQ0FDUztBQUNELCtCQUFXLEVBRFY7QUFFRCwwQkFBTSxFQUZMO0FBR0QseUJBQUs7QUFISixpQkFEVCxFQU1LLE1BTkwsQ0FNWTtBQUNKLDhCQURJO0FBRUo7QUFGSSxpQkFOWixFQVVLLFVBVkwsQ0FVZ0IsZUFWaEI7QUFXQSx5QkFBUyxNQUFUO0FBQ0g7QUF4RU0sU0FEZjtBQTJFSCxLQTVFRDtBQTZFSCxDQWhHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVnZ2ZWIgZnJvbSAnLi9idWlsZGVyJztcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuICAgICQoJyNtZW51LXBhbmVsIC5uYXZiYXItbmF2IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnI2xlZnQtcGFuZWwnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJCgnI3JpZ2h0LXBhbmVsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGlzRWxlbWVudENyZWF0ZWQgPSBmYWxzZTtcclxuICAgIGxldCAkZWxlbWVudDtcclxuICAgIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnRzID0gJyNjb21wb25lbnRzLWxpc3QgbGkgb2wgbGknO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHdpbmRvdy5pbnRlcmFjdCA9IGZyYW1lc1swXS5pbnRlcmFjdDtcclxuICAgICAgICBzZXRJbnRlcmFjdGFibGVzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNldEludGVyYWN0YWJsZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaW50ZXJhY3QoZHJhZ2dhYmxlRWxlbWVudHMsIHsgY29udGV4dDogZG9jdW1lbnQgfSlcclxuICAgICAgICAgICAgLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAvLyBlbmFibGUgaW5lcnRpYWwgdGhyb3dpbmdcclxuICAgICAgICAgICAgICAgIGluZXJ0aWE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyBrZWVwIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgYXJlYSBvZiBpdCdzIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcmFtZUlkJykuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFJlY3Q6IHsgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDEsIHJpZ2h0OiAxIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBlbmFibGUgYXV0b1Njcm9sbFxyXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ21vdmUgZXZlbnRcclxuICAgICAgICAgICAgICAgIG9ubW92ZTogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNFbGVtZW50Q3JlYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLmdldCgkKGV2ZW50LnRhcmdldCkuZGF0YShcInR5cGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gY29tcG9uZW50LmRyYWdIdG1sIHx8IGNvbXBvbmVudC5odG1sO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkKGh0bWwpLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT0gJ2lubGluZS1ibG9jaycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZXZlbnQucGFnZVggLSAkZWxlbWVudC5vdXRlcldpZHRoKCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZXZlbnQucGFnZVkgLSAkZWxlbWVudC5vdXRlckhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IDk5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LnBhZ2VYIC0gMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBldmVudC5wYWdlWSAtIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd6LWluZGV4JzogOTk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbGVtZW50Q3JlYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gKHBhcnNlRmxvYXQoJGVsZW1lbnQuYXR0cignZGF0YS14JykpIHx8IDApICsgZXZlbnQuZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSAocGFyc2VGbG9hdCgkZWxlbWVudC5hdHRyKCdkYXRhLXknKSkgfHwgMCkgKyBldmVudC5keTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS14JzogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXknOiB5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiBvbiBldmVyeSBkcmFnZW5kIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBvbmVuZDogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gJCgnI2lmcmFtZUlkJykub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wIC0gJCgnI2lmcmFtZUlkJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRWxlbWVudENyZWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnm7TmjqXmm7/mjaLlhYPntKDkvJrmnInmi5bliqjpl67popjvvIzlj6/og73mmK/lm6DkuLrlhYPntKDmnKzouqvlnKjniLbpobXpnaLvvIzmiYDku6XljIXlkKvkuIDkupvnibnmrorlsZ7mgKfmnInlhbNcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflvpdodG1s5a2X56ym5Liy77yM54S25ZCO5YaN6L+b6KGM5pu/5o2iXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mcmFtZUJvZHkuYXBwZW5kKCRlbGVtZW50LnByb3AoXCJvdXRlckhUTUxcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcGVuZGVkRWxlbWVudCA9IHNlbGYuZnJhbWVCb2R5LmNoaWxkcmVuKCdib2R5ID4gKjpsYXN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kZWRFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub2Zmc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEteCBkYXRhLXknKTtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59KTsiXX0=
