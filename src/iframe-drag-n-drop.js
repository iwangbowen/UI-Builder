import { removeAlignmentLines, arrowKeyMove, drawAlignmentLine } from './util/drag-n-drop';
import interact from '../node_modules/interactjs/src/index';

self.interact = interact;
self.arrowKeyMove = arrowKeyMove;

$(document).ready(() => {
    let enteredDropzone = false;
    const isDropzoneParent = element => !!$(element).parents('.dropzone').length;

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
                // offset()函数用于设置或返回当前匹配元素相对于当前文档的偏移，也就是相对于当前文档的坐标
                // 元素可以是任意定位方式的元素
                // 单独设置left或top对于absolute定位的元素来说，是相对于最近的已定位祖先元素或相对于最初的包含块。
                const offset = $(event.relatedTarget).offset();
                $(event.relatedTarget)
                    .appendTo($(event.target))
                    .css({
                        left: '',
                        top: '',
                        transform: '',
                    })
                    .offset(offset)
                    .removeAttr('data-x data-y');
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
                if (!enteredDropzone && isDropzoneParent(event.relatedTarget)) {
                    const offset = $(event.relatedTarget).offset();
                    $(event.relatedTarget)
                        .appendTo($('body'))
                        .offset(offset);
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

    interact('body *.draggable')
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