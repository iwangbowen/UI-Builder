require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({146:[function(require,module,exports){
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
                var component = _builder2.default.Components.matchNode($element[0]);
                isElementCreated = false;
                if (component.onDrop) {
                    component.onDrop($element[0]);
                } else {
                    var left = $element.offset().left - $('#iframeId').offset().left,
                        top = $element.offset().top - $('#iframeId').offset().top;
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
            }
        });
    };
});

},{"./builder":52}]},{},[146])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGRyYWctbi1kcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTtBQUNwQixNQUFFLDJCQUFGLEVBQStCLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFlBQVk7QUFDbkQsWUFBSSxDQUFDLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakIsQ0FBTCxFQUFpQztBQUM3QixjQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0EsY0FBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixXQUFuQixDQUErQixRQUEvQjtBQUNBLGNBQUUsYUFBRixFQUFpQixNQUFqQjtBQUNBLGNBQUUsY0FBRixFQUFrQixNQUFsQjtBQUNIO0FBQ0osS0FQRDs7QUFTQSxRQUFJLG1CQUFtQixLQUF2QjtBQUNBLFFBQUksaUJBQUo7QUFDQSxRQUFNLG9CQUFvQiwyQkFBMUI7O0FBRUEsYUFBUyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLE1BQWpDLEdBQTBDLFVBQVUsS0FBVixFQUFpQjtBQUN2RCxlQUFPLFFBQVAsR0FBa0IsT0FBTyxDQUFQLEVBQVUsUUFBNUI7QUFDQTtBQUNILEtBSEQ7O0FBS0EsUUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CLEdBQU07QUFDM0IsaUJBQVMsaUJBQVQsRUFBNEIsRUFBRSxTQUFTLFFBQVgsRUFBNUIsRUFDSyxTQURMLENBQ2U7QUFDUDtBQUNBLHFCQUFTLElBRkY7QUFHUDtBQUNBLHNCQUFVO0FBQ04sNkJBQWEsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLGFBQXBDLENBQWtELFFBQWxELENBQTJELElBRGxFO0FBRU4seUJBQVMsSUFGSDtBQUdOLDZCQUFhLEVBQUUsS0FBSyxDQUFQLEVBQVUsTUFBTSxDQUFoQixFQUFtQixRQUFRLENBQTNCLEVBQThCLE9BQU8sQ0FBckM7QUFIUCxhQUpIO0FBU1A7QUFDQSx3QkFBWSxJQVZMOztBQVlQO0FBQ0Esb0JBQVEsdUJBQVM7QUFDYixvQkFBSSxDQUFDLGdCQUFMLEVBQXVCO0FBQ25CLHdCQUFNLFlBQVksa0JBQU0sVUFBTixDQUFpQixHQUFqQixDQUFxQixFQUFFLE1BQU0sTUFBUixFQUFnQixJQUFoQixDQUFxQixNQUFyQixDQUFyQixDQUFsQjtBQUNBLHdCQUFNLE9BQU8sVUFBVSxRQUFWLElBQXNCLFVBQVUsSUFBN0M7O0FBRUEsK0JBQVcsRUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixFQUFFLE1BQUYsQ0FBakIsQ0FBWDtBQUNBLHdCQUFNLFVBQVUsU0FBUyxHQUFULENBQWEsU0FBYixDQUFoQjtBQUNBLHdCQUFJLFdBQVcsY0FBZixFQUErQjtBQUMzQixpQ0FBUyxHQUFULENBQWE7QUFDVCxzQ0FBVSxVQUREO0FBRVQsa0NBQU0sTUFBTSxLQUFOLEdBQWMsU0FBUyxVQUFULEtBQXdCLENBRm5DO0FBR1QsaUNBQUssTUFBTSxLQUFOLEdBQWMsU0FBUyxXQUFULEtBQXlCLENBSG5DO0FBSVQsdUNBQVc7QUFKRix5QkFBYjtBQU1ILHFCQVBELE1BT087QUFDSCxpQ0FBUyxHQUFULENBQWE7QUFDVCxzQ0FBVSxVQUREO0FBRVQsa0NBQU0sTUFBTSxLQUFOLEdBQWMsRUFGWDtBQUdULGlDQUFLLE1BQU0sS0FBTixHQUFjLEVBSFY7QUFJVCx1Q0FBVztBQUpGLHlCQUFiO0FBTUg7O0FBRUQsdUNBQW1CLElBQW5CO0FBQ0g7O0FBRUQsb0JBQU0sSUFBSSxDQUFDLFdBQVcsU0FBUyxJQUFULENBQWMsUUFBZCxDQUFYLEtBQXVDLENBQXhDLElBQTZDLE1BQU0sRUFBN0Q7QUFBQSxvQkFDSSxJQUFJLENBQUMsV0FBVyxTQUFTLElBQVQsQ0FBYyxRQUFkLENBQVgsS0FBdUMsQ0FBeEMsSUFBNkMsTUFBTSxFQUQzRDs7QUFHQSx5QkFDSyxHQURMLENBQ1M7QUFDRCw4Q0FBd0IsQ0FBeEIsWUFBZ0MsQ0FBaEM7QUFEQyxpQkFEVCxFQUlLLElBSkwsQ0FJVTtBQUNGLDhCQUFVLENBRFI7QUFFRiw4QkFBVTtBQUZSLGlCQUpWO0FBUUgsYUFsRE07QUFtRFA7QUFDQSxtQkFBTyxzQkFBUztBQUNaLG9CQUFNLFlBQVksa0JBQU0sVUFBTixDQUFpQixTQUFqQixDQUEyQixTQUFTLENBQVQsQ0FBM0IsQ0FBbEI7QUFDQSxtQ0FBbUIsS0FBbkI7QUFDQSxvQkFBSSxVQUFVLE1BQWQsRUFBc0I7QUFDbEIsOEJBQVUsTUFBVixDQUFpQixTQUFTLENBQVQsQ0FBakI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQU0sT0FBTyxTQUFTLE1BQVQsR0FBa0IsSUFBbEIsR0FBeUIsRUFBRSxXQUFGLEVBQWUsTUFBZixHQUF3QixJQUE5RDtBQUFBLHdCQUNJLE1BQU0sU0FBUyxNQUFULEdBQWtCLEdBQWxCLEdBQXdCLEVBQUUsV0FBRixFQUFlLE1BQWYsR0FBd0IsR0FEMUQ7QUFFQTtBQUNBO0FBQ0EseUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsU0FBUyxJQUFULENBQWMsV0FBZCxDQUF0QjtBQUNBLHdCQUFNLGtCQUFrQixLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLGVBQXhCLENBQXhCO0FBQ0Esb0NBQ0ssR0FETCxDQUNTO0FBQ0QsbUNBQVcsRUFEVjtBQUVELDhCQUFNLEVBRkw7QUFHRCw2QkFBSztBQUhKLHFCQURULEVBTUssTUFOTCxDQU1ZO0FBQ0osa0NBREk7QUFFSjtBQUZJLHFCQU5aLEVBVUssVUFWTCxDQVVnQixlQVZoQjtBQVdBLDZCQUFTLE1BQVQ7QUFDSDtBQUNKO0FBN0VNLFNBRGY7QUFnRkgsS0FqRkQ7QUFrRkgsQ0FyR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZ2dmViIGZyb20gJy4vYnVpbGRlcic7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICAkKCcjbWVudS1wYW5lbCAubmF2YmFyLW5hdiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJyNsZWZ0LXBhbmVsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICQoJyNyaWdodC1wYW5lbCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBpc0VsZW1lbnRDcmVhdGVkID0gZmFsc2U7XHJcbiAgICBsZXQgJGVsZW1lbnQ7XHJcbiAgICBjb25zdCBkcmFnZ2FibGVFbGVtZW50cyA9ICcjY29tcG9uZW50cy1saXN0IGxpIG9sIGxpJztcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKS5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB3aW5kb3cuaW50ZXJhY3QgPSBmcmFtZXNbMF0uaW50ZXJhY3Q7XHJcbiAgICAgICAgc2V0SW50ZXJhY3RhYmxlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXRJbnRlcmFjdGFibGVzID0gKCkgPT4ge1xyXG4gICAgICAgIGludGVyYWN0KGRyYWdnYWJsZUVsZW1lbnRzLCB7IGNvbnRleHQ6IGRvY3VtZW50IH0pXHJcbiAgICAgICAgICAgIC5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgLy8gZW5hYmxlIGluZXJ0aWFsIHRocm93aW5nXHJcbiAgICAgICAgICAgICAgICBpbmVydGlhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGFyZWEgb2YgaXQncyBwYXJlbnRcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJhbWVJZCcpLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSxcclxuICAgICAgICAgICAgICAgICAgICBlbmRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRSZWN0OiB7IHRvcDogMCwgbGVmdDogMCwgYm90dG9tOiAxLCByaWdodDogMSB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gZW5hYmxlIGF1dG9TY3JvbGxcclxuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIG9uIGV2ZXJ5IGRyYWdtb3ZlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBvbm1vdmU6IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRWxlbWVudENyZWF0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gVnZ2ZWIuQ29tcG9uZW50cy5nZXQoJChldmVudC50YXJnZXQpLmRhdGEoXCJ0eXBlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGNvbXBvbmVudC5kcmFnSHRtbCB8fCBjb21wb25lbnQuaHRtbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJChodG1sKS5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5ID0gJGVsZW1lbnQuY3NzKCdkaXNwbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5ID09ICdpbmxpbmUtYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LnBhZ2VYIC0gJGVsZW1lbnQub3V0ZXJXaWR0aCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGV2ZW50LnBhZ2VZIC0gJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3otaW5kZXgnOiA5OTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBldmVudC5wYWdlWCAtIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZXZlbnQucGFnZVkgLSAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IDk5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRWxlbWVudENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IChwYXJzZUZsb2F0KCRlbGVtZW50LmF0dHIoJ2RhdGEteCcpKSB8fCAwKSArIGV2ZW50LmR4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gKHBhcnNlRmxvYXQoJGVsZW1lbnQuYXR0cignZGF0YS15JykpIHx8IDApICsgZXZlbnQuZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEteCc6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS15JzogeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ2VuZCBldmVudFxyXG4gICAgICAgICAgICAgICAgb25lbmQ6IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBWdnZlYi5Db21wb25lbnRzLm1hdGNoTm9kZSgkZWxlbWVudFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbGVtZW50Q3JlYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQub25Ecm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5vbkRyb3AoJGVsZW1lbnRbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gJCgnI2lmcmFtZUlkJykub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcCAtICQoJyNpZnJhbWVJZCcpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u05o6l5pu/5o2i5YWD57Sg5Lya5pyJ5ouW5Yqo6Zeu6aKY77yM5Y+v6IO95piv5Zug5Li65YWD57Sg5pys6Lqr5Zyo54i26aG16Z2i77yM5omA5Lul5YyF5ZCr5LiA5Lqb54m55q6K5bGe5oCn5pyJ5YWzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiOt+W+l2h0bWzlrZfnrKbkuLLvvIznhLblkI7lho3ov5vooYzmm7/mjaJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mcmFtZUJvZHkuYXBwZW5kKCRlbGVtZW50LnByb3AoXCJvdXRlckhUTUxcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcHBlbmRlZEVsZW1lbnQgPSBzZWxmLmZyYW1lQm9keS5jaGlsZHJlbignYm9keSA+ICo6bGFzdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRlZEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vZmZzZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEteCBkYXRhLXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcbn0pOyJdfQ==
