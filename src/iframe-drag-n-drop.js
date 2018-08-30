import {
    hideAlignmentLines, arrowKeyMove, showAlignmentLines, updatePosition,
    hideHighlightAreas, getAttributes
} from './util/iframe-drag-n-drop-util';
import { addData, editData, deleteData, getAddContent, getEditContent } from './layer';
import MoveMutation from './models/mutation/move-mutation';

$(document).ready(() => {
    self.interact = interact;
    self.arrowKeyMove = arrowKeyMove;
    self.addData = addData;
    self.editData = editData;
    self.deleteData = deleteData;
    self.getAddContent = getAddContent;
    self.getEditContent = getEditContent;
    let enteredDropzone = false;
    const isDropzoneParent = element => !!$(element).parents('.dropzone').length;
    let mutation;

    // enable draggables to be dropped into this
    interact('.dropzone')
        .dropzone({
            // only accept elements matching this CSS selector
            accept: 'body *',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.50,
            // listen for drop related events:
            ondropactivate(event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter(event) {
                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;
                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
            },
            ondragleave(event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
                enteredDropzone = false;
            },
            ondrop(event) {
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
            ondropdeactivate(event) {
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
            edges: { left: false, right: false, bottom: false, top: false },
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

    interact('.resize-drag')
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
            onstart(event) {
                const target = event.target;
                mutation = new MoveMutation({
                    target,
                    oldParent: target.parentNode,
                    oldNextSibling: target.nextSibling,
                    oldAttrs: getAttributes(target)
                });
            },
            onmove(event) {
                hideAlignmentLines();
                hideHighlightAreas();
                const target = event.target;
                const selectedElements = window.parent.getSelectedElements();
                if (selectedElements.includes(target)) {
                    selectedElements.forEach(target => updatePosition(target, event));
                } else {
                    updatePosition(target, event);
                    showAlignmentLines(target);
                }
            },
            // call this function on every dragend event
            onend(event) {
                hideAlignmentLines();
                const target = event.target;
                mutation.newParent = target.parentNode;
                mutation.newNextSibling = target.nextSibling;
                mutation.newAttrs = getAttributes(target);
                window.parent.Vvveb.Undo.addMutation(mutation);
            }
        });
});