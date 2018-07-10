(function () {
    const isAlign = (targetOffset, currentOffset) => ({
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 1,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 1
    });

    const removeAlignmentLines = () => $('.horizontal-line, .vertical-line').remove();

    self.arrowKeyMove = (key, element) => {
        removeAlignmentLines();

        let dx = 0, dy = 0;
        switch (key) {
            case 37: // left
                dx = -1;
                break;
            case 38: // up
                dy = -1;
                break;
            case 39: // right
                dx = 1;
                break;
            case 40: // down
                dy = 1;
                break;
            default: return; // exit this handler for other keys
        }

        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(element.attr('data-x')) || 0) + dx,
            y = (parseFloat(element.attr('data-y')) || 0) + dy;

        element.css({
            transform: `translate(${x}px, ${y}px)`
        });

        // update the position attributes
        element.attr('data-x', x);
        element.attr('data-y', y);

        dragAlignmentLine(element.get(0));
    };

    const dragAlignmentLine = (target) => {
        let horizontalLineExists = false;
        let verticalLineExists = false;
        const targetOffset = $(target).offset();

        Array.from($('body *:visible:not(script)'))
            .filter(currentValue => currentValue != target)
            .some(currentValue => {
                const currentOffset = $(currentValue).offset();
                const { isHorizontalAlign, isVerticalAlign } = isAlign(targetOffset, currentOffset);
                if (!horizontalLineExists && isHorizontalAlign) {
                    $('<hr />')
                        .addClass('horizontal-line')
                        .css({
                            top: targetOffset.top
                        })
                        .appendTo($('body'));
                    horizontalLineExists = true;
                }
                if (!verticalLineExists && isVerticalAlign) {
                    $('<hr />')
                        .addClass('vertical-line')
                        .css({
                            left: targetOffset.left
                        })
                        .appendTo($('body'));
                    verticalLineExists = true;
                }
                return horizontalLineExists && verticalLineExists;
            });
    };

    $(document).ready(() => {
        let enteredDropzone = false;
        const isDropzoneParent = element => !!$(element).parents('.dropzone').length;
        const setTransformStyle = (element, left, top) => {
            element.style.webkitTransform =
                element.style.transform =
                `translate(${left}px, ${top}px)`;
            return $(element);
        };

        // enable draggables to be dropped into this
        interact('.dropzone')
            .dropzone({
                // only accept elements matching this CSS selector
                accept: 'body *',
                // Require a 75% element overlap for a drop to be possible
                overlap: 0.50,
                // listen for drop related events:
                ondropactivate: function (event) {
                    // add active dropzone feedback
                    event.target.classList.add('drop-active');
                },
                ondragenter: function (event) {
                    var draggableElement = event.relatedTarget,
                        dropzoneElement = event.target;

                    // feedback the possibility of a drop
                    dropzoneElement.classList.add('drop-target');
                    draggableElement.classList.add('can-drop');
                },
                ondragleave: function (event) {
                    // remove the drop feedback style
                    event.target.classList.remove('drop-target');
                    event.relatedTarget.classList.remove('can-drop');
                    enteredDropzone = false;
                },
                ondrop: event => {
                    enteredDropzone = true;
                    const left = $(event.relatedTarget).offset().left - $(event.target).offset().left,
                        top = $(event.relatedTarget).offset().top - $(event.target).offset().top;
                    $(event.relatedTarget).appendTo($(event.target));
                    setTransformStyle(event.relatedTarget, left, top)
                        .css({
                            left: 0,
                            top: 0
                        })
                        .attr({
                            'data-x': left,
                            'data-y': top
                        })
                },
                ondropdeactivate: function (event) {
                    // remove active dropzone feedback
                    event.target.classList.remove('drop-active');
                    event.target.classList.remove('drop-target');
                    if (!enteredDropzone && isDropzoneParent(event.relatedTarget)) {
                        const { left, top } = $(event.relatedTarget).offset();
                        setTransformStyle(event.relatedTarget, left, top)
                            .attr({
                                'data-x': left,
                                'data-y': top
                            })
                            .appendTo($('body'));
                    }
                }
            })
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },

                // keep the edges inside the parent
                restrictEdges: {
                    outer: 'parent',
                    endOnly: true,
                },

                // minimum size
                restrictSize: {
                    min: { width: 100, height: 50 },
                },

                inertia: true,
            })
            .on('resizemove', function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            });

        interact('body *')
            .draggable({
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
                onmove: event => {
                    removeAlignmentLines();
                    var target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

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