require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({4:[function(require,module,exports){
var _dragNDrop = require('./util/drag-n-drop');

(function () {

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
})();

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGlmcmFtZS1kcmFnLW4tZHJvcC5qcyIsInNyY1xcdXRpbFxcZHJhZy1uLWRyb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxDQUFDLFlBQVk7O0FBRVQsU0FBSyxZQUFMLEdBQW9CLHVCQUFwQjs7QUFFQSxNQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQU07QUFDcEIsWUFBSSxrQkFBa0IsS0FBdEI7QUFDQSxZQUFNLG1CQUFtQixTQUFuQixnQkFBbUI7QUFBQSxtQkFBVyxDQUFDLENBQUMsRUFBRSxPQUFGLEVBQVcsT0FBWCxDQUFtQixXQUFuQixFQUFnQyxNQUE3QztBQUFBLFNBQXpCO0FBQ0EsWUFBTSw0QkFBNEIsU0FBNUIseUJBQTRCLFdBQVk7QUFDMUMsZ0JBQUksQ0FBQyxTQUFTLE1BQVYsSUFBb0IsU0FBUyxHQUFULENBQWEsVUFBYixLQUE0QixVQUFwRCxFQUFnRTtBQUM1RCx3QkFBUSxHQUFSLENBQVksU0FBUyxHQUFULENBQWEsVUFBYixDQUFaO0FBQ0EsdUJBQU8sUUFBUDtBQUNILGFBSEQsTUFHTztBQUNILHVCQUFPLDBCQUEwQixTQUFTLE1BQVQsRUFBMUIsQ0FBUDtBQUNIO0FBQ0osU0FQRDs7QUFTQSxZQUFNLG9CQUFvQixTQUFwQixpQkFBb0IsQ0FBQyxPQUFELEVBQVUsSUFBVixFQUFnQixHQUFoQixFQUF3QjtBQUM5QyxvQkFBUSxLQUFSLENBQWMsZUFBZCxHQUNJLFFBQVEsS0FBUixDQUFjLFNBQWQsa0JBQ2EsSUFEYixZQUN3QixHQUR4QixRQURKO0FBR0EsbUJBQU8sRUFBRSxPQUFGLENBQVA7QUFDSCxTQUxEOztBQU9BO0FBQ0EsaUJBQVMsV0FBVCxFQUNLLFFBREwsQ0FDYztBQUNOO0FBQ0Esb0JBQVEsUUFGRjtBQUdOO0FBQ0EscUJBQVMsSUFKSDtBQUtOO0FBQ0EsNEJBQWdCLHdCQUFVLEtBQVYsRUFBaUI7QUFDN0I7QUFDQSxzQkFBTSxNQUFOLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixhQUEzQjtBQUNILGFBVEs7QUFVTix5QkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCLG9CQUFJLG1CQUFtQixNQUFNLGFBQTdCO0FBQUEsb0JBQ0ksa0JBQWtCLE1BQU0sTUFENUI7O0FBR0E7QUFDQSxnQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsYUFBOUI7QUFDQSxpQ0FBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsVUFBL0I7QUFDSCxhQWpCSztBQWtCTix5QkFBYSxxQkFBVSxLQUFWLEVBQWlCO0FBQzFCO0FBQ0Esc0JBQU0sTUFBTixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDQSxzQkFBTSxhQUFOLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFVBQXJDO0FBQ0Esa0NBQWtCLEtBQWxCO0FBQ0gsYUF2Qks7QUF3Qk4sb0JBQVEsdUJBQVM7QUFDYixrQ0FBa0IsSUFBbEI7O0FBRUEsb0JBQUksYUFBSjtBQUFBLG9CQUFVLFlBQVY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBTSxVQUFVLDBCQUEwQixFQUFFLE1BQU0sTUFBUixDQUExQixDQUFoQjtBQUNBLG9CQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNmLDJCQUFPLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEdBQWdDLElBQWhDLEdBQXVDLFFBQVEsTUFBUixHQUFpQixJQUEvRDtBQUNBLDBCQUFNLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEdBQWdDLEdBQWhDLEdBQXNDLFFBQVEsTUFBUixHQUFpQixHQUE3RDtBQUNILGlCQUhELE1BR087QUFDSCwyQkFBTyxFQUFFLE1BQU0sYUFBUixFQUF1QixNQUF2QixHQUFnQyxJQUF2QztBQUNBLDBCQUFNLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEdBQWdDLEdBQXRDO0FBQ0g7O0FBRUQsa0JBQUUsTUFBTSxhQUFSLEVBQXVCLFFBQXZCLENBQWdDLEVBQUUsTUFBTSxNQUFSLENBQWhDO0FBQ0Esa0NBQWtCLE1BQU0sYUFBeEIsRUFBdUMsSUFBdkMsRUFBNkMsR0FBN0MsRUFDSyxHQURMLENBQ1M7QUFDRCwwQkFBTSxDQURMO0FBRUQseUJBQUs7QUFGSixpQkFEVCxFQUtLLElBTEwsQ0FLVTtBQUNGLDhCQUFVLElBRFI7QUFFRiw4QkFBVTtBQUZSLGlCQUxWO0FBU0gsYUFsREs7QUFtRE4sOEJBQWtCLDBCQUFVLEtBQVYsRUFBaUI7QUFDL0I7QUFDQSxzQkFBTSxNQUFOLENBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixhQUE5QjtBQUNBLHNCQUFNLE1BQU4sQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLGFBQTlCO0FBQ0Esb0JBQUksQ0FBQyxlQUFELElBQW9CLGlCQUFpQixNQUFNLGFBQXZCLENBQXhCLEVBQStEO0FBQUEsb0NBQ3JDLEVBQUUsTUFBTSxhQUFSLEVBQXVCLE1BQXZCLEVBRHFDO0FBQUEsd0JBQ25ELElBRG1ELGFBQ25ELElBRG1EO0FBQUEsd0JBQzdDLEdBRDZDLGFBQzdDLEdBRDZDOztBQUUzRCxzQ0FBa0IsTUFBTSxhQUF4QixFQUF1QyxJQUF2QyxFQUE2QyxHQUE3QyxFQUNLLElBREwsQ0FDVTtBQUNGLGtDQUFVLElBRFI7QUFFRixrQ0FBVTtBQUZSLHFCQURWLEVBS0ssUUFMTCxDQUtjLEVBQUUsTUFBRixDQUxkO0FBTUg7QUFDSjtBQWhFSyxTQURkLEVBbUVLLFNBbkVMLENBbUVlO0FBQ1A7QUFDQSxtQkFBTyxFQUFFLE1BQU0sSUFBUixFQUFjLE9BQU8sSUFBckIsRUFBMkIsUUFBUSxJQUFuQyxFQUF5QyxLQUFLLElBQTlDLEVBRkE7O0FBSVA7QUFDQSwyQkFBZTtBQUNYLHVCQUFPLFFBREk7QUFFWCx5QkFBUztBQUZFLGFBTFI7O0FBVVA7QUFDQSwwQkFBYztBQUNWLHFCQUFLLEVBQUUsT0FBTyxHQUFULEVBQWMsUUFBUSxFQUF0QjtBQURLLGFBWFA7O0FBZVAscUJBQVM7QUFmRixTQW5FZixFQW9GSyxFQXBGTCxDQW9GUSxZQXBGUixFQW9Gc0IsVUFBVSxLQUFWLEVBQWlCO0FBQy9CLGdCQUFJLFNBQVMsTUFBTSxNQUFuQjtBQUFBLGdCQUNJLElBQUssV0FBVyxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsQ0FBWCxLQUE2QyxDQUR0RDtBQUFBLGdCQUVJLElBQUssV0FBVyxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsQ0FBWCxLQUE2QyxDQUZ0RDs7QUFJQTtBQUNBLG1CQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXFCLE1BQU0sSUFBTixDQUFXLEtBQVgsR0FBbUIsSUFBeEM7QUFDQSxtQkFBTyxLQUFQLENBQWEsTUFBYixHQUFzQixNQUFNLElBQU4sQ0FBVyxNQUFYLEdBQW9CLElBQTFDOztBQUVBO0FBQ0EsaUJBQUssTUFBTSxTQUFOLENBQWdCLElBQXJCO0FBQ0EsaUJBQUssTUFBTSxTQUFOLENBQWdCLEdBQXJCOztBQUVBLG1CQUFPLEtBQVAsQ0FBYSxlQUFiLEdBQStCLE9BQU8sS0FBUCxDQUFhLFNBQWIsR0FDM0IsZUFBZSxDQUFmLEdBQW1CLEtBQW5CLEdBQTJCLENBQTNCLEdBQStCLEtBRG5DOztBQUdBLG1CQUFPLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsQ0FBOUI7QUFDQSxtQkFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0gsU0F0R0w7O0FBd0dBLGlCQUFTLFFBQVQsRUFDSyxTQURMLENBQ2U7QUFDUDtBQUNBLHFCQUFTLElBRkY7QUFHUDtBQUNBLHNCQUFVO0FBQ04sNkJBQWEsU0FBUyxJQURoQjtBQUVOLHlCQUFTLElBRkg7QUFHTiw2QkFBYSxFQUFFLEtBQUssQ0FBUCxFQUFVLE1BQU0sQ0FBaEIsRUFBbUIsUUFBUSxDQUEzQixFQUE4QixPQUFPLENBQXJDO0FBSFAsYUFKSDtBQVNQO0FBQ0Esd0JBQVksSUFWTDs7QUFZUDtBQUNBLG9CQUFRLHVCQUFTO0FBQ2I7QUFDQSxvQkFBSSxTQUFTLE1BQU0sTUFBbkI7O0FBQ0k7QUFDQSxvQkFBSSxDQUFDLFdBQVcsT0FBTyxZQUFQLENBQW9CLFFBQXBCLENBQVgsS0FBNkMsQ0FBOUMsSUFBbUQsTUFBTSxFQUZqRTtBQUFBLG9CQUdJLElBQUksQ0FBQyxXQUFXLE9BQU8sWUFBUCxDQUFvQixRQUFwQixDQUFYLEtBQTZDLENBQTlDLElBQW1ELE1BQU0sRUFIakU7O0FBS0E7QUFDQSx1QkFBTyxLQUFQLENBQWEsZUFBYixHQUNJLE9BQU8sS0FBUCxDQUFhLFNBQWIsR0FDQSxlQUFlLENBQWYsR0FBbUIsTUFBbkIsR0FBNEIsQ0FBNUIsR0FBZ0MsS0FGcEM7O0FBSUE7QUFDQSx1QkFBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLENBQTlCO0FBQ0EsdUJBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixDQUE5Qjs7QUFFQSxrREFBa0IsTUFBbEI7QUFDSCxhQTlCTTtBQStCUDtBQUNBLG1CQUFPO0FBaENBLFNBRGY7QUFtQ0gsS0EvSkQ7QUFnS0gsQ0FwS0Q7Ozs7OztBQ0ZBLFNBQVMsT0FBVCxDQUFpQixZQUFqQixFQUErQixhQUEvQixFQUE4QztBQUMxQyxXQUFPO0FBQ0gsMkJBQW1CLEtBQUssR0FBTCxDQUFTLGFBQWEsR0FBYixHQUFtQixjQUFjLEdBQTFDLEtBQWtELENBRGxFO0FBRUgseUJBQWlCLEtBQUssR0FBTCxDQUFTLGFBQWEsSUFBYixHQUFvQixjQUFjLElBQTNDLEtBQW9EO0FBRmxFLEtBQVA7QUFJSDs7QUFFRCxTQUFTLG9CQUFULEdBQWdDO0FBQzVCLE1BQUUsa0NBQUYsRUFBc0MsTUFBdEM7QUFDSDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLE1BQTNCLEVBQW1DO0FBQy9CLFFBQUksdUJBQXVCLEtBQTNCO0FBQ0EsUUFBSSxxQkFBcUIsS0FBekI7QUFDQSxRQUFNLGVBQWUsRUFBRSxNQUFGLEVBQVUsTUFBVixFQUFyQjs7QUFFQSxVQUFNLElBQU4sQ0FBVyxFQUFFLDRCQUFGLENBQVgsRUFDSyxNQURMLENBQ1k7QUFBQSxlQUFnQixnQkFBZ0IsTUFBaEM7QUFBQSxLQURaLEVBRUssSUFGTCxDQUVVLHdCQUFnQjtBQUNsQixZQUFNLGdCQUFnQixFQUFFLFlBQUYsRUFBZ0IsTUFBaEIsRUFBdEI7O0FBRGtCLHVCQUU2QixRQUFRLFlBQVIsRUFBc0IsYUFBdEIsQ0FGN0I7QUFBQSxZQUVWLGlCQUZVLFlBRVYsaUJBRlU7QUFBQSxZQUVTLGVBRlQsWUFFUyxlQUZUOztBQUdsQixZQUFJLENBQUMsb0JBQUQsSUFBeUIsaUJBQTdCLEVBQWdEO0FBQzVDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxpQkFEZCxFQUVLLEdBRkwsQ0FFUztBQUNELHFCQUFLLGFBQWE7QUFEakIsYUFGVCxFQUtLLFFBTEwsQ0FLYyxFQUFFLE1BQUYsQ0FMZDtBQU1BLG1DQUF1QixJQUF2QjtBQUNIO0FBQ0QsWUFBSSxDQUFDLGtCQUFELElBQXVCLGVBQTNCLEVBQTRDO0FBQ3hDLGNBQUUsUUFBRixFQUNLLFFBREwsQ0FDYyxlQURkLEVBRUssR0FGTCxDQUVTO0FBQ0Qsc0JBQU0sYUFBYTtBQURsQixhQUZULEVBS0ssUUFMTCxDQUtjLEVBQUUsTUFBRixDQUxkO0FBTUEsaUNBQXFCLElBQXJCO0FBQ0g7QUFDRCxlQUFPLHdCQUF3QixrQkFBL0I7QUFDSCxLQXhCTDtBQXlCSDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkIsT0FBM0IsRUFBb0M7QUFDaEM7O0FBRUEsUUFBSSxLQUFLLENBQVQ7QUFBQSxRQUFZLEtBQUssQ0FBakI7QUFDQSxZQUFRLEdBQVI7QUFDSSxhQUFLLEVBQUw7QUFBUztBQUNMLGlCQUFLLENBQUMsQ0FBTjtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFDLENBQU47QUFDQTtBQUNKLGFBQUssRUFBTDtBQUFTO0FBQ0wsaUJBQUssQ0FBTDtBQUNBO0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTCxpQkFBSyxDQUFMO0FBQ0E7QUFDSjtBQUFTLG1CQWJiLENBYXFCO0FBYnJCOztBQWdCQTtBQUNBLFFBQU0sSUFBSSxDQUFDLFdBQVcsUUFBUSxJQUFSLENBQWEsUUFBYixDQUFYLEtBQXNDLENBQXZDLElBQTRDLEVBQXREO0FBQUEsUUFDSSxJQUFJLENBQUMsV0FBVyxRQUFRLElBQVIsQ0FBYSxRQUFiLENBQVgsS0FBc0MsQ0FBdkMsSUFBNEMsRUFEcEQ7O0FBR0EsWUFBUSxHQUFSLENBQVk7QUFDUixrQ0FBd0IsQ0FBeEIsWUFBZ0MsQ0FBaEM7QUFEUSxLQUFaOztBQUlBO0FBQ0EsWUFBUSxJQUFSLENBQWEsUUFBYixFQUF1QixDQUF2QjtBQUNBLFlBQVEsSUFBUixDQUFhLFFBQWIsRUFBdUIsQ0FBdkI7O0FBRUEsc0JBQWtCLFFBQVEsR0FBUixDQUFZLENBQVosQ0FBbEI7QUFDSDs7UUFFUSxvQixHQUFBLG9CO1FBQXNCLFksR0FBQSxZO1FBQWMsaUIsR0FBQSxpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyByZW1vdmVBbGlnbm1lbnRMaW5lcywgYXJyb3dLZXlNb3ZlLCBkcmF3QWxpZ25tZW50TGluZSB9IGZyb20gJy4vdXRpbC9kcmFnLW4tZHJvcCc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHNlbGYuYXJyb3dLZXlNb3ZlID0gYXJyb3dLZXlNb3ZlO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuICAgICAgICBsZXQgZW50ZXJlZERyb3B6b25lID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgaXNEcm9wem9uZVBhcmVudCA9IGVsZW1lbnQgPT4gISEkKGVsZW1lbnQpLnBhcmVudHMoJy5kcm9wem9uZScpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBnZXRBYnNvbHV0ZVBvc2l0aW9uUGFyZW50ID0gJGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISRlbGVtZW50Lmxlbmd0aCB8fCAkZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBYnNvbHV0ZVBvc2l0aW9uUGFyZW50KCRlbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNldFRyYW5zZm9ybVN0eWxlID0gKGVsZW1lbnQsIGxlZnQsIHRvcCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICBgdHJhbnNsYXRlKCR7bGVmdH1weCwgJHt0b3B9cHgpYDtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZW5hYmxlIGRyYWdnYWJsZXMgdG8gYmUgZHJvcHBlZCBpbnRvIHRoaXNcclxuICAgICAgICBpbnRlcmFjdCgnLmRyb3B6b25lJylcclxuICAgICAgICAgICAgLmRyb3B6b25lKHtcclxuICAgICAgICAgICAgICAgIC8vIG9ubHkgYWNjZXB0IGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ1NTIHNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICBhY2NlcHQ6ICdib2R5IConLFxyXG4gICAgICAgICAgICAgICAgLy8gUmVxdWlyZSBhIDc1JSBlbGVtZW50IG92ZXJsYXAgZm9yIGEgZHJvcCB0byBiZSBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgb3ZlcmxhcDogMC41MCxcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgZHJvcCByZWxhdGVkIGV2ZW50czpcclxuICAgICAgICAgICAgICAgIG9uZHJvcGFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgYWN0aXZlIGRyb3B6b25lIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25kcmFnZW50ZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcmFnZ2FibGVFbGVtZW50ID0gZXZlbnQucmVsYXRlZFRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBmZWVkYmFjayB0aGUgcG9zc2liaWxpdHkgb2YgYSBkcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3AtdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYW4tZHJvcCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uZHJhZ2xlYXZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGRyb3AgZmVlZGJhY2sgc3R5bGVcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcC10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Nhbi1kcm9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25kcm9wOiBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50ZXJlZERyb3B6b25lID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQsIHRvcDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkcm9wem9uZeWFg+e0oOS4jeS4gOWumuaYr3Bvc2l0aW9u5Li6YWJzb2x1dGXnmoTlhYPntKBcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuLrkuoblrp7njrDlt6bplK7miqzotbfml7bkuI3lgY/np7vvvIzpnIDopoHmib7liLBkcm9wem9uZeaIluWFtueItuWFg+e0oOS4rXBvc2l0b27kuLphYnNvbHV0ZeeahOWFg+e0oFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW5tuabtOaWsOaLluaLveWFg+e0oOeahHRyYW5zZm9ybeWxnuaAp1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRwYXJlbnQgPSBnZXRBYnNvbHV0ZVBvc2l0aW9uUGFyZW50KCQoZXZlbnQudGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkub2Zmc2V0KCkubGVmdCAtICRwYXJlbnQub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKS50b3AgLSAkcGFyZW50Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZXZlbnQucmVsYXRlZFRhcmdldCkuYXBwZW5kVG8oJChldmVudC50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUcmFuc2Zvcm1TdHlsZShldmVudC5yZWxhdGVkVGFyZ2V0LCBsZWZ0LCB0b3ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS14JzogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXknOiB0b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbmRyb3BkZWFjdGl2YXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWN0aXZlIGRyb3B6b25lIGZlZWRiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AtdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbnRlcmVkRHJvcHpvbmUgJiYgaXNEcm9wem9uZVBhcmVudChldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KS5vZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNmb3JtU3R5bGUoZXZlbnQucmVsYXRlZFRhcmdldCwgbGVmdCwgdG9wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXgnOiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXknOiB0b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzaXplIGZyb20gYWxsIGVkZ2VzIGFuZCBjb3JuZXJzXHJcbiAgICAgICAgICAgICAgICBlZGdlczogeyBsZWZ0OiB0cnVlLCByaWdodDogdHJ1ZSwgYm90dG9tOiB0cnVlLCB0b3A6IHRydWUgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBrZWVwIHRoZSBlZGdlcyBpbnNpZGUgdGhlIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3RFZGdlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dGVyOiAncGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBlbmRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtaW5pbXVtIHNpemVcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0U2l6ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDUwIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGluZXJ0aWE6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbigncmVzaXplbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICB4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSAocGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSkgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBlbGVtZW50J3Mgc3R5bGVcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IGV2ZW50LnJlY3Qud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGV2ZW50LnJlY3QuaGVpZ2h0ICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUgd2hlbiByZXNpemluZyBmcm9tIHRvcCBvciBsZWZ0IGVkZ2VzXHJcbiAgICAgICAgICAgICAgICB4ICs9IGV2ZW50LmRlbHRhUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgeSArPSBldmVudC5kZWx0YVJlY3QudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGludGVyYWN0KCdib2R5IConKVxyXG4gICAgICAgICAgICAuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIC8vIGVuYWJsZSBpbmVydGlhbCB0aHJvd2luZ1xyXG4gICAgICAgICAgICAgICAgaW5lcnRpYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vIGtlZXAgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBhcmVhIG9mIGl0J3MgcGFyZW50XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFJlY3Q6IHsgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDEsIHJpZ2h0OiAxIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBlbmFibGUgYXV0b1Njcm9sbFxyXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gb24gZXZlcnkgZHJhZ21vdmUgZXZlbnRcclxuICAgICAgICAgICAgICAgIG9ubW92ZTogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFsaWdubWVudExpbmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCB0aGUgZHJhZ2dlZCBwb3NpdGlvbiBpbiB0aGUgZGF0YS14L2RhdGEteSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSAocGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSkgfHwgMCkgKyBldmVudC5keCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwKSArIGV2ZW50LmR5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KSc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaWlvbiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdBbGlnbm1lbnRMaW5lKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIG9uIGV2ZXJ5IGRyYWdlbmQgZXZlbnRcclxuICAgICAgICAgICAgICAgIG9uZW5kOiByZW1vdmVBbGlnbm1lbnRMaW5lc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyIsImZ1bmN0aW9uIGlzQWxpZ24odGFyZ2V0T2Zmc2V0LCBjdXJyZW50T2Zmc2V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGlzSG9yaXpvbnRhbEFsaWduOiBNYXRoLmFicyh0YXJnZXRPZmZzZXQudG9wIC0gY3VycmVudE9mZnNldC50b3ApIDw9IDEsXHJcbiAgICAgICAgaXNWZXJ0aWNhbEFsaWduOiBNYXRoLmFicyh0YXJnZXRPZmZzZXQubGVmdCAtIGN1cnJlbnRPZmZzZXQubGVmdCkgPD0gMVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxpZ25tZW50TGluZXMoKSB7XHJcbiAgICAkKCcuaG9yaXpvbnRhbC1saW5lLCAudmVydGljYWwtbGluZScpLnJlbW92ZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWxpZ25tZW50TGluZSh0YXJnZXQpIHtcclxuICAgIGxldCBob3Jpem9udGFsTGluZUV4aXN0cyA9IGZhbHNlO1xyXG4gICAgbGV0IHZlcnRpY2FsTGluZUV4aXN0cyA9IGZhbHNlO1xyXG4gICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gJCh0YXJnZXQpLm9mZnNldCgpO1xyXG5cclxuICAgIEFycmF5LmZyb20oJCgnYm9keSAqOnZpc2libGU6bm90KHNjcmlwdCknKSlcclxuICAgICAgICAuZmlsdGVyKGN1cnJlbnRWYWx1ZSA9PiBjdXJyZW50VmFsdWUgIT0gdGFyZ2V0KVxyXG4gICAgICAgIC5zb21lKGN1cnJlbnRWYWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPZmZzZXQgPSAkKGN1cnJlbnRWYWx1ZSkub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaXNIb3Jpem9udGFsQWxpZ24sIGlzVmVydGljYWxBbGlnbiB9ID0gaXNBbGlnbih0YXJnZXRPZmZzZXQsIGN1cnJlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICBpZiAoIWhvcml6b250YWxMaW5lRXhpc3RzICYmIGlzSG9yaXpvbnRhbEFsaWduKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8aHIgLz4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaG9yaXpvbnRhbC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRPZmZzZXQudG9wXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICAgICAgICAgICAgIGhvcml6b250YWxMaW5lRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXZlcnRpY2FsTGluZUV4aXN0cyAmJiBpc1ZlcnRpY2FsQWxpZ24pIHtcclxuICAgICAgICAgICAgICAgICQoJzxociAvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd2ZXJ0aWNhbC1saW5lJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0T2Zmc2V0LmxlZnRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljYWxMaW5lRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaG9yaXpvbnRhbExpbmVFeGlzdHMgJiYgdmVydGljYWxMaW5lRXhpc3RzO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcnJvd0tleU1vdmUoa2V5LCBlbGVtZW50KSB7XHJcbiAgICByZW1vdmVBbGlnbm1lbnRMaW5lcygpO1xyXG5cclxuICAgIGxldCBkeCA9IDAsIGR5ID0gMDtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgY2FzZSAzNzogLy8gbGVmdFxyXG4gICAgICAgICAgICBkeCA9IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM4OiAvLyB1cFxyXG4gICAgICAgICAgICBkeSA9IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM5OiAvLyByaWdodFxyXG4gICAgICAgICAgICBkeCA9IDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDA6IC8vIGRvd25cclxuICAgICAgICAgICAgZHkgPSAxO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiByZXR1cm47IC8vIGV4aXQgdGhpcyBoYW5kbGVyIGZvciBvdGhlciBrZXlzXHJcbiAgICB9XHJcblxyXG4gICAgLy8ga2VlcCB0aGUgZHJhZ2dlZCBwb3NpdGlvbiBpbiB0aGUgZGF0YS14L2RhdGEteSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCB4ID0gKHBhcnNlRmxvYXQoZWxlbWVudC5hdHRyKCdkYXRhLXgnKSkgfHwgMCkgKyBkeCxcclxuICAgICAgICB5ID0gKHBhcnNlRmxvYXQoZWxlbWVudC5hdHRyKCdkYXRhLXknKSkgfHwgMCkgKyBkeTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWBcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlc1xyXG4gICAgZWxlbWVudC5hdHRyKCdkYXRhLXgnLCB4KTtcclxuICAgIGVsZW1lbnQuYXR0cignZGF0YS15JywgeSk7XHJcblxyXG4gICAgZHJhd0FsaWdubWVudExpbmUoZWxlbWVudC5nZXQoMCkpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW1vdmVBbGlnbm1lbnRMaW5lcywgYXJyb3dLZXlNb3ZlLCBkcmF3QWxpZ25tZW50TGluZSB9OyJdfQ==
