import Vvveb from '../gui/components';
import ChildListMutation from '../models/mutation/child-list-mutation';
import { isOverlap } from '../util/dom';
import { componentSelector } from './selectors';

function getCursorAt($element) {
    const display = $element.css('display');
    if (display == 'inline-block') {
        return {
            left: $element.outerWidth() / 2,
            top: $element.outerHeight() / 2,
        };
    } else {
        return {
            left: 20,
            top: 20
        };
    }
}

function initComponentDrag(item, component) {
    const html = component.dragHtml || component.html;
    const cursorAt = getCursorAt($(html));
    $(item).draggable({
        iframeFix: true,
        helper() {
            const $element = $(html).appendTo($('body'));
            $element.css({ 'z-index': 999 });
            return $element;
        },
        cursorAt,
        drag() {
        },
        stop() {
        },
        revert: 'invalid'
    });
}

function initTopPanelDrag() {
    $('#top-panel').draggable({
        iframeFix: true,
        axis: 'x',
        cursor: 'e-resize'
    });
}

function drop(event, { draggable, helper, offset }) {
    // Check drag elements from inside or out of iframe
    if (draggable == helper) {
        $(this).append(draggable);
    } else {
        const component = Vvveb.Components.matchNode(helper.get(0));
        let appendedElement;
        if (component.onDrop) {
            appendedElement = component.onDrop(helper);
        } else if (component.sortable) {
            appendedElement = $(this).find('.saveArea')
                .before(helper.prop('outerHTML'))
                .prev()
                .css({
                    position: '',
                    left: '',
                    top: ''
                });
        } else {
            appendedElement = $(this).append(helper.prop('outerHTML'))
                .children('*:last')
                .offset(offset);
        }
        Vvveb.Undo.addMutation(new ChildListMutation({
            target: appendedElement.get(0).parentNode,
            addedNodes: [...appendedElement],
            nextSibing: appendedElement[0].nextSibing
        }));
    }
}

function initIframeDrop() {
    Vvveb.Builder.frameBody.droppable({
        accept: componentSelector,
        drop
    });
}

function initIframeFormAndPopupDrop() {
    Vvveb.Builder.frameBody
        .find('.allButton.dropzone, div.popup-window form.popup-form')
        .droppable({
            greedy: true,
            accept: componentSelector,
            drop
        });
}

function initIframeDrag() {
    Vvveb.Builder.frameBody
        .find('.draggable')
        .draggable({
            containment: 'document'
        });
}

function initIframePopupSortable() {
    Vvveb.Builder.frameBody
        .find('form.popup-form')
        .sortable({
            cursor: 'move'
        });
}

function initComponentDragWithInteract() {
    let $element;
    window.interact = frames[0].interact;
    interact(componentSelector, { context: document })
        .draggable({
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
            onstart(event) {
                const component = Vvveb.Components.get($(event.target).data("type"));
                const html = component.dragHtml || component.html;
                $element = $(html).appendTo($('body'));
                const display = $element.css('display');
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
            },
            // call this function on every dragmove event
            onmove: event => {
                const x = (parseFloat($element.attr('data-x')) || 0) + event.dx,
                    y = (parseFloat($element.attr('data-y')) || 0) + event.dy;
                $element
                    .css({
                        transform: `translate(${x}px, ${y}px)`
                    })
                    .attr({
                        'data-x': x,
                        'data-y': y
                    });
            },
            // call this function on every dragend event
            onend: event => {
                const component = Vvveb.Components.matchNode($element[0]);
                isElementCreated = false;
                let appendedElement;
                if (component.onDrop) {
                    appendedElement = component.onDrop($element[0]);
                } else {
                    const left = $element.offset().left - $('#iframeId').offset().left,
                        top = $element.offset().top - $('#iframeId').offset().top;
                    // 直接替换元素会有拖动问题，可能是因为元素本身在父页面，所以包含一些特殊属性有关
                    // 获得html字符串，然后再进行替换
                    let appendToElement = Vvveb.Builder.frameBody;
                    if (component.dropzone
                        && isOverlap($element.get(0), Vvveb.Builder.frameBody.find(component.dropzone).get(0))) {
                        appendToElement = Vvveb.Builder.frameBody.find(component.dropzone);
                    }
                    appendToElement.append($element.prop("outerHTML"));
                    appendedElement = appendToElement
                        .children('*:last')
                        .css({
                            transform: '',
                            left: '',
                            top: ''
                        })
                        .offset({
                            left,
                            top
                        })
                        .removeAttr('data-x data-y');
                }
                $element.remove();
                Vvveb.Undo.addMutation(new ChildListMutation({
                    target: appendedElement.get(0).parentNode,
                    addedNodes: [appendedElement.get(0)],
                    nextSibing: appendedElement[0].nextSibing
                }));
            }
        });
}

export {
    initTopPanelDrag,
    initComponentDrag,
    initIframeDrop,
    initIframeFormAndPopupDrop,
    initIframeDrag,
    initComponentDragWithInteract,
    initIframePopupSortable
};