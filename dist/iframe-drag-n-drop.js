require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({4:[function(require,module,exports){
var _dragNDrop = require('./util/drag-n-drop');

self.arrowKeyMove = _dragNDrop.arrowKeyMove;

$(document).ready(function () {
    var enteredDropzone = false;
    var isDropzoneParent = function isDropzoneParent(element) {
        return !!$(element).parents('.dropzone').length;
    };
    var getAbsolutePositionParent = function getAbsolutePositionParent($element) {
        if (!$element.length || $element.css('position') == 'absolute') {
            console.log($element.css('position'));
            return $element;
        } else {
            return getAbsolutePositionParent($element.parent());
        }
    };

    var setTransformStyle = function setTransformStyle(element, left, top) {
        element.style.webkitTransform = element.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
        return $(element);
    };

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: 'body *',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.50,
        // listen for drop related events:
        ondropactivate: function ondropactivate(event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active');
        },
        ondragenter: function ondragenter(event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
        },
        ondragleave: function ondragleave(event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
            enteredDropzone = false;
        },
        ondrop: function ondrop(event) {
            enteredDropzone = true;

            var left = void 0,
                top = void 0;
            // dropzone元素不一定是position为absolute的元素
            // 为了实现左键抬起时不偏移，需要找到dropzone或其父元素中positon为absolute的元素
            // 并更新拖拽元素的transform属性
            var $parent = getAbsolutePositionParent($(event.target));
            if (parent.length) {
                left = $(event.relatedTarget).offset().left - $parent.offset().left;
                top = $(event.relatedTarget).offset().top - $parent.offset().top;
            } else {
                left = $(event.relatedTarget).offset().left;
                top = $(event.relatedTarget).offset().top;
            }

            $(event.relatedTarget).appendTo($(event.target));
            setTransformStyle(event.relatedTarget, left, top).css({
                left: 0,
                top: 0
            }).attr({
                'data-x': left,
                'data-y': top
            });
        },
        ondropdeactivate: function ondropdeactivate(event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
            if (!enteredDropzone && isDropzoneParent(event.relatedTarget)) {
                var _$$offset = $(event.relatedTarget).offset(),
                    left = _$$offset.left,
                    top = _$$offset.top;

                setTransformStyle(event.relatedTarget, left, top).attr({
                    'data-x': left,
                    'data-y': top
                }).appendTo($('body'));
            }
        }
    }).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 50 }
        },

        inertia: true
    }).on('resizemove', function (event) {
        var target = event.target,
            x = parseFloat(target.getAttribute('data-x')) || 0,
            y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    });

    interact('body *').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: document.body,
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: function onmove(event) {
            (0, _dragNDrop.removeAlignmentLines)();
            var target = event.target,

            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            (0, _dragNDrop.drawAlignmentLine)(target);
        },
        // call this function on every dragend event
        onend: _dragNDrop.removeAlignmentLines
    });
});

},{"./util/drag-n-drop":31}],31:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
    value: true
});
function isAlign(targetOffset, currentOffset) {
    return {
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 1,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 1
    };
}

function removeAlignmentLines() {
    $('.horizontal-line, .vertical-line').remove();
}

function drawAlignmentLine(target) {
    var horizontalLineExists = false;
    var verticalLineExists = false;
    var targetOffset = $(target).offset();

    Array.from($('body *:visible:not(script)')).filter(function (currentValue) {
        return currentValue != target;
    }).some(function (currentValue) {
        var currentOffset = $(currentValue).offset();

        var _isAlign = isAlign(targetOffset, currentOffset),
            isHorizontalAlign = _isAlign.isHorizontalAlign,
            isVerticalAlign = _isAlign.isVerticalAlign;

        if (!horizontalLineExists && isHorizontalAlign) {
            $('<hr />').addClass('horizontal-line').css({
                top: targetOffset.top
            }).appendTo($('body'));
            horizontalLineExists = true;
        }
        if (!verticalLineExists && isVerticalAlign) {
            $('<hr />').addClass('vertical-line').css({
                left: targetOffset.left
            }).appendTo($('body'));
            verticalLineExists = true;
        }
        return horizontalLineExists && verticalLineExists;
    });
}

function arrowKeyMove(key, element) {
    removeAlignmentLines();

    var dx = 0,
        dy = 0;
    switch (key) {
        case 37:
            // left
            dx = -1;
            break;
        case 38:
            // up
            dy = -1;
            break;
        case 39:
            // right
            dx = 1;
            break;
        case 40:
            // down
            dy = 1;
            break;
        default:
            return; // exit this handler for other keys
    }

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(element.attr('data-x')) || 0) + dx,
        y = (parseFloat(element.attr('data-y')) || 0) + dy;

    element.css({
        transform: 'translate(' + x + 'px, ' + y + 'px)'
    });

    // update the position attributes
    element.attr('data-x', x);
    element.attr('data-y', y);

    drawAlignmentLine(element.get(0));
}

exports.removeAlignmentLines = removeAlignmentLines;
exports.arrowKeyMove = arrowKeyMove;
exports.drawAlignmentLine = drawAlignmentLine;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGlmcmFtZS1kcmFnLW4tZHJvcC5qcyIsInNyY1xcdXRpbFxcZHJhZy1uLWRyb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxLQUFLLFlBQUwsR0FBb0IsdUJBQXBCOztBQUVBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTtBQUNwQixRQUFJLGtCQUFrQixLQUF0QjtBQUNBLFFBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQjtBQUFBLGVBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBRixFQUFXLE9BQVgsQ0FBbUIsV0FBbkIsRUFBZ0MsTUFBN0M7QUFBQSxLQUF6QjtBQUNBLFFBQU0sNEJBQTRCLFNBQTVCLHlCQUE0QixXQUFZO0FBQzFDLFlBQUksQ0FBQyxTQUFTLE1BQVYsSUFBb0IsU0FBUyxHQUFULENBQWEsVUFBYixLQUE0QixVQUFwRCxFQUFnRTtBQUM1RCxvQkFBUSxHQUFSLENBQVksU0FBUyxHQUFULENBQWEsVUFBYixDQUFaO0FBQ0EsbUJBQU8sUUFBUDtBQUNILFNBSEQsTUFHTztBQUNILG1CQUFPLDBCQUEwQixTQUFTLE1BQVQsRUFBMUIsQ0FBUDtBQUNIO0FBQ0osS0FQRDs7QUFTQSxRQUFNLG9CQUFvQixTQUFwQixpQkFBb0IsQ0FBQyxPQUFELEVBQVUsSUFBVixFQUFnQixHQUFoQixFQUF3QjtBQUM5QyxnQkFBUSxLQUFSLENBQWMsZUFBZCxHQUNJLFFBQVEsS0FBUixDQUFjLFNBQWQsa0JBQ2EsSUFEYixZQUN3QixHQUR4QixRQURKO0FBR0EsZUFBTyxFQUFFLE9BQUYsQ0FBUDtBQUNILEtBTEQ7O0FBT0E7QUFDQSxhQUFTLFdBQVQsRUFDSyxRQURMLENBQ2M7QUFDTjtBQUNBLGdCQUFRLFFBRkY7QUFHTjtBQUNBLGlCQUFTLElBSkg7QUFLTjtBQUNBLHdCQUFnQix3QkFBVSxL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QyxXQUFXLFFBQVEsSUFBUixDQUFhLFFBQWIsQ0FBWCxLQUFzQyxDQUF2QyxJQUE0QyxFQURwRDs7QUFHQSxZQUFRLEdBQVIsQ0FBWTtBQUNSLGtDQUF3QixDQUF4QixZQUFnQyxDQUFoQztBQURRLEtBQVo7O0FBSUE7QUFDQSxZQUFRLElBQVIsQ0FBYSxRQUFiLEVBQXVCLENBQXZCO0FBQ0EsWUFBUSxJQUFSLENBQWEsUUFBYixFQUF1QixDQUF2Qjs7QUFFQSxzQkFBa0IsUUFBUSxHQUFSLENBQVksQ0FBWixDQUFsQjtBQUNIOztRQUVRLG9CLEdBQUEsb0I7UUFBc0IsWSxHQUFBLFk7UUFBYyxpQixHQUFBLGlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHJlbW92ZUFsaWdubWVudExpbmVzLCBhcnJvd0tleU1vdmUsIGRyYXdBbGlnbm1lbnRMaW5lIH0gZnJvbSAnLi91dGlsL2RyYWctbi1kcm9wJztcclxuXHJcbnNlbGYuYXJyb3dLZXlNb3ZlID0gYXJyb3dLZXlNb3ZlO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICAgbGV0IGVudGVyZWREcm9wem9uZSA9IGZhbHNlO1xyXG4gICAgY29uc3QgaXNEcm9wem9uZVBhcmVudCA9IGVsZW1lbnQgPT4gISEkKGVsZW1lbnQpLnBhcmVudHMoJy5kcm9wem9uZScpLmxlbmd0aDtcclxuICAgIGNvbnN0IGdldEFic29sdXRlUG9zaXRpb25QYXJlbnQgPSAkZWxlbWVudCA9PiB7XHJcbiAgICAgICAgaWYgKCEkZWxlbWVudC5sZW5ndGggfHwgJGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09ICdhYnNvbHV0ZScpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpKTtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRBYnNvbHV0ZVBvc2l0aW9uUGFyZW50KCRlbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNldFRyYW5zZm9ybVN0eWxlID0gKGVsZW1lbnQsIGxlZnQsIHRvcCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPVxyXG4gICAgICAgICAgICBgdHJhbnNsYXRlKCR7bGVmdH1weCwgJHt0b3B9cHgpYDtcclxuICAgICAgICByZXR1cm4gJChlbGVtZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZW5hYmxlIGRyYWdnYWJsZXMgdG8gYmUgZHJvcHBlZCBpbnRvIHRoaXNcclxuICAgIGludGVyYWN0KCcuZHJvcHpvbmUnKVxyXG4gICAgICAgIC5kcm9wem9uZSh7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgYWNjZXB0IGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ1NTIHNlbGVjdG9yXHJcbiAgICAgICAgICAgIGFjY2VwdDogJ2JvZHkgKicsXHJcbiAgICAgICAgICAgIC8vIFJlcXVpcmUgYSA3NSUgZWxlbWVudCBvdmVybGFwIGZvciBhIGRyb3AgdG8gYmUgcG9zc2libGVcclxuICAgICAgICAgICAgb3ZlcmxhcDogMC41MCxcclxuICAgICAgICAgICAgLy8gbGlzdGVuIGZvciBkcm9wIHJlbGF0ZWQgZXZlbnRzOlxyXG4gICAgICAgICAgICBvbmRyb3BhY3RpdmF0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgYWN0aXZlIGRyb3B6b25lIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJvcC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25kcmFnZW50ZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdnYWJsZUVsZW1lbnQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3B6b25lRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmZWVkYmFjayB0aGUgcG9zc2liaWxpdHkgb2YgYSBkcm9wXHJcbiAgICAgICAgICAgICAgICBkcm9wem9uZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJvcC10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FuLWRyb3AnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25kcmFnbGVhdmU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBkcm9wIGZlZWRiYWNrIHN0eWxlXHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY2FuLWRyb3AnKTtcclxuICAgICAgICAgICAgICAgIGVudGVyZWREcm9wem9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmRyb3A6IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVudGVyZWREcm9wem9uZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQsIHRvcDtcclxuICAgICAgICAgICAgICAgIC8vIGRyb3B6b25l5YWD57Sg5LiN5LiA5a6a5pivcG9zaXRpb27kuLphYnNvbHV0ZeeahOWFg+e0oFxyXG4gICAgICAgICAgICAgICAgLy8g5Li65LqG5a6e546w5bem6ZSu5oqs6LW35pe25LiN5YGP56e777yM6ZyA6KaB5om+5YiwZHJvcHpvbmXmiJblhbbniLblhYPntKDkuK1wb3NpdG9u5Li6YWJzb2x1dGXnmoTlhYPntKBcclxuICAgICAgICAgICAgICAgIC8vIOW5tuabtOaWsOaLluaLveWFg+e0oOeahHRyYW5zZm9ybeWxnuaAp1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHBhcmVudCA9IGdldEFic29sdXRlUG9zaXRpb25QYXJlbnQoJChldmVudC50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkub2Zmc2V0KCkubGVmdCAtICRwYXJlbnQub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpLnRvcCAtICRwYXJlbnQub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldCkuYXBwZW5kVG8oJChldmVudC50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgIHNldFRyYW5zZm9ybVN0eWxlKGV2ZW50LnJlbGF0ZWRUYXJnZXQsIGxlZnQsIHRvcClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXgnOiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS15JzogdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25kcm9wZGVhY3RpdmF0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGRyb3B6b25lIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbnRlcmVkRHJvcHpvbmUgJiYgaXNEcm9wem9uZVBhcmVudChldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zZm9ybVN0eWxlKGV2ZW50LnJlbGF0ZWRUYXJnZXQsIGxlZnQsIHRvcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEteCc6IGxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS15JzogdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgLy8gcmVzaXplIGZyb20gYWxsIGVkZ2VzIGFuZCBjb3JuZXJzXHJcbiAgICAgICAgICAgIGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUsIHRvcDogdHJ1ZSB9LFxyXG5cclxuICAgICAgICAgICAgLy8ga2VlcCB0aGUgZWRnZXMgaW5zaWRlIHRoZSBwYXJlbnRcclxuICAgICAgICAgICAgcmVzdHJpY3RFZGdlczoge1xyXG4gICAgICAgICAgICAgICAgb3V0ZXI6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbmltdW0gc2l6ZVxyXG4gICAgICAgICAgICByZXN0cmljdFNpemU6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDUwIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbmVydGlhOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdyZXNpemVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZWxlbWVudCdzIHN0eWxlXHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IGV2ZW50LnJlY3Qud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gZXZlbnQucmVjdC5oZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHdoZW4gcmVzaXppbmcgZnJvbSB0b3Agb3IgbGVmdCBlZGdlc1xyXG4gICAgICAgICAgICB4ICs9IGV2ZW50LmRlbHRhUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB5ICs9IGV2ZW50LmRlbHRhUmVjdC50b3A7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgaW50ZXJhY3QoJ2JvZHkgKicpXHJcbiAgICAgICAgLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSBpbmVydGlhbCB0aHJvd2luZ1xyXG4gICAgICAgICAgICBpbmVydGlhOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBrZWVwIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgYXJlYSBvZiBpdCdzIHBhcmVudFxyXG4gICAgICAgICAgICByZXN0cmljdDoge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Rpb246IGRvY3VtZW50LmJvZHksXHJcbiAgICAgICAgICAgICAgICBlbmRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFJlY3Q6IHsgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDEsIHJpZ2h0OiAxIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZW5hYmxlIGF1dG9TY3JvbGxcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiBvbiBldmVyeSBkcmFnbW92ZSBldmVudFxyXG4gICAgICAgICAgICBvbm1vdmU6IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFsaWdubWVudExpbmVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgdGhlIGRyYWdnZWQgcG9zaXRpb24gaW4gdGhlIGRhdGEteC9kYXRhLXkgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSAocGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSkgfHwgMCkgKyBldmVudC5keCxcclxuICAgICAgICAgICAgICAgICAgICB5ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15JykpIHx8IDApICsgZXZlbnQuZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCknO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaWlvbiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRyYXdBbGlnbm1lbnRMaW5lKHRhcmdldCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiBvbiBldmVyeSBkcmFnZW5kIGV2ZW50XHJcbiAgICAgICAgICAgIG9uZW5kOiByZW1vdmVBbGlnbm1lbnRMaW5lc1xyXG4gICAgICAgIH0pO1xyXG59KTsiLCJmdW5jdGlvbiBpc0FsaWduKHRhcmdldE9mZnNldCwgY3VycmVudE9mZnNldCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpc0hvcml6b250YWxBbGlnbjogTWF0aC5hYnModGFyZ2V0T2Zmc2V0LnRvcCAtIGN1cnJlbnRPZmZzZXQudG9wKSA8PSAxLFxyXG4gICAgICAgIGlzVmVydGljYWxBbGlnbjogTWF0aC5hYnModGFyZ2V0T2Zmc2V0LmxlZnQgLSBjdXJyZW50T2Zmc2V0LmxlZnQpIDw9IDFcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUFsaWdubWVudExpbmVzKCkge1xyXG4gICAgJCgnLmhvcml6b250YWwtbGluZSwgLnZlcnRpY2FsLWxpbmUnKS5yZW1vdmUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FsaWdubWVudExpbmUodGFyZ2V0KSB7XHJcbiAgICBsZXQgaG9yaXpvbnRhbExpbmVFeGlzdHMgPSBmYWxzZTtcclxuICAgIGxldCB2ZXJ0aWNhbExpbmVFeGlzdHMgPSBmYWxzZTtcclxuICAgIGNvbnN0IHRhcmdldE9mZnNldCA9ICQodGFyZ2V0KS5vZmZzZXQoKTtcclxuXHJcbiAgICBBcnJheS5mcm9tKCQoJ2JvZHkgKjp2aXNpYmxlOm5vdChzY3JpcHQpJykpXHJcbiAgICAgICAgLmZpbHRlcihjdXJyZW50VmFsdWUgPT4gY3VycmVudFZhbHVlICE9IHRhcmdldClcclxuICAgICAgICAuc29tZShjdXJyZW50VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gJChjdXJyZW50VmFsdWUpLm9mZnNldCgpO1xyXG4gICAgICAgICAgICBjb25zdCB7IGlzSG9yaXpvbnRhbEFsaWduLCBpc1ZlcnRpY2FsQWxpZ24gfSA9IGlzQWxpZ24odGFyZ2V0T2Zmc2V0LCBjdXJyZW50T2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKCFob3Jpem9udGFsTGluZUV4aXN0cyAmJiBpc0hvcml6b250YWxBbGlnbikge1xyXG4gICAgICAgICAgICAgICAgJCgnPGhyIC8+JylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hvcml6b250YWwtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0T2Zmc2V0LnRvcFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsTGluZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF2ZXJ0aWNhbExpbmVFeGlzdHMgJiYgaXNWZXJ0aWNhbEFsaWduKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8aHIgLz4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndmVydGljYWwtbGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldE9mZnNldC5sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsTGluZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvcml6b250YWxMaW5lRXhpc3RzICYmIHZlcnRpY2FsTGluZUV4aXN0cztcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyb3dLZXlNb3ZlKGtleSwgZWxlbWVudCkge1xyXG4gICAgcmVtb3ZlQWxpZ25tZW50TGluZXMoKTtcclxuXHJcbiAgICBsZXQgZHggPSAwLCBkeSA9IDA7XHJcbiAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgIGNhc2UgMzc6IC8vIGxlZnRcclxuICAgICAgICAgICAgZHggPSAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzODogLy8gdXBcclxuICAgICAgICAgICAgZHkgPSAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOTogLy8gcmlnaHRcclxuICAgICAgICAgICAgZHggPSAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwOiAvLyBkb3duXHJcbiAgICAgICAgICAgIGR5ID0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuOyAvLyBleGl0IHRoaXMgaGFuZGxlciBmb3Igb3RoZXIga2V5c1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgdGhlIGRyYWdnZWQgcG9zaXRpb24gaW4gdGhlIGRhdGEteC9kYXRhLXkgYXR0cmlidXRlc1xyXG4gICAgY29uc3QgeCA9IChwYXJzZUZsb2F0KGVsZW1lbnQuYXR0cignZGF0YS14JykpIHx8IDApICsgZHgsXHJcbiAgICAgICAgeSA9IChwYXJzZUZsb2F0KGVsZW1lbnQuYXR0cignZGF0YS15JykpIHx8IDApICsgZHk7XHJcblxyXG4gICAgZWxlbWVudC5jc3Moe1xyXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZXNcclxuICAgIGVsZW1lbnQuYXR0cignZGF0YS14JywgeCk7XHJcbiAgICBlbGVtZW50LmF0dHIoJ2RhdGEteScsIHkpO1xyXG5cclxuICAgIGRyYXdBbGlnbm1lbnRMaW5lKGVsZW1lbnQuZ2V0KDApKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVtb3ZlQWxpZ25tZW50TGluZXMsIGFycm93S2V5TW92ZSwgZHJhd0FsaWdubWVudExpbmUgfTsiXX0=
