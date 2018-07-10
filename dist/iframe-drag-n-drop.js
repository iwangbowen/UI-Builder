(function () {
    var isAlign = function isAlign(targetOffset, currentOffset) {
        return {
            isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 1,
            isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 1
        };
    };

    var removeAlignmentLines = function removeAlignmentLines() {
        return $('.horizontal-line, .vertical-line').remove();
    };

    self.arrowKeyMove = function (key, element) {
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

        dragAlignmentLine(element.get(0));
    };

    var dragAlignmentLine = function dragAlignmentLine(target) {
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
    };

    $(document).ready(function () {
        var enteredDropzone = false;
        var isDropzoneParent = function isDropzoneParent(element) {
            return !!$(element).parents('.dropzone').length;
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
                if ($(event.target).css('position') == 'absolute') {
                    left = $(event.relatedTarget).offset().left - $(event.target).offset().left;
                    top = $(event.relatedTarget).offset().top - $(event.target).offset().top;
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
                removeAlignmentLines();
                var target = event.target,

                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                dragAlignmentLine(target);
            },
            // call this function on every dragend event
            onend: removeAlignmentLines
        });
    });
})();
//# sourceMappingURL=iframe-drag-n-drop.js.map
