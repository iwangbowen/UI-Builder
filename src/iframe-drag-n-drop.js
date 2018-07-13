import { removeAlignmentLines, arrowKeyMove, drawAlignmentLine } from './util/drag-n-drop';
import interact from '../node_modules/interactjs/src/index';

self.interact = interact;
self.arrowKeyMove = arrowKeyMove;

$(document).ready(() => {
    let enteredDropzone = false;
    const isDropzoneParent = element => !!$(element).parents('.dropzone').length;
    const getAbsolutePositionParent = $element => {
        if (!$element.length || $element.css('position') == 'absolute') {
            console.log($element.css('position'));
            return $element;
        } else {
            return getAbsolutePositionParent($element.parent());
        }
    };

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

                let left, top;
                // dropzone元素不一定是position为absolute的元素
                // 为了实现左键抬起时不偏移，需要找到dropzone或其父元素中positon为absolute的元素
                // 并更新拖拽元素的transform属性
                const $parent = getAbsolutePositionParent($(event.target));
                if (parent.length) {
                    left = $(event.relatedTarget).offset().left - $parent.offset().left;
                    top = $(event.relatedTarget).offset().top - $parent.offset().top;
                } else {
                    left = $(event.relatedTarget).offset().left;
                    top = $(event.relatedTarget).offset().top;
                }

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

                drawAlignmentLine(target);
            },
            // call this function on every dragend event
            onend: removeAlignmentLines
        });
});