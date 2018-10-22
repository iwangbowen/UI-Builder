import Vvveb from '../gui/components';
import ChildListMutation from '../models/mutation/child-list-mutation';
import { isOverlap } from '../util/dom';
import { componentSelector, sortableDivSelector } from './selectors';
import MoveMutation from '../models/mutation/move-mutation';
import _ from 'lodash';
import {
    textinputfieldid, datetimeinputfieldid, fileinputfieldid,
    autoselectinputfieldid, manualselectinputfieldid, multivalueselectinputfieldid,
    textareafieldid, radiofieldid, checkboxfieldid, popuptextinputid, popupmanualselectinputid,
    customtableid, commontableid, formid, gridrowid, buttonid
} from '../components/@oee/ids';
import 'core-js/es7/array';

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
        // Use https://maxazan.github.io/jquery-ui-droppable-iframe/ to deal with
        // iframe scroll issue
        // Use jquery-ui scope instead of accept to circumvent bugs in
        // https://github.com/maxazan/jquery-ui-droppable-iframe/issues/4
        iframeScroll: true,
        scope: componentScopes[item.data('type')],
        helper() {
            const $element = $(html).appendTo($('body'));
            $element.css({ 'z-index': 15 });
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

function enableSortableAndDroppable(elements) {
    $(elements)
        .sortable({
            connectWith: 'div.gridster > div > form',
            cursor: 'move',
            // Prevents sorting if you start on elements matching the selector.
            // Default: "input,textarea,button,select,option"
            cancel: "button, option, div.ui-resizable-handle",
            start: onSortingStarts,
            update: onSortingUpdates
        })
        .droppable({
            greedy: true,
            scope: 'formItems',
            drop
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
            // Check if the drop zone is popup form
            if ($(this).is('form.popup-form')) {
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
                    .css({
                        position: '',
                        left: '',
                        top: ''
                    });
            }
        } else {
            appendedElement = $(this).append(helper.prop('outerHTML'))
                .children('*:last')
                .css({
                    position: 'none',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    // margin: '20px'
                });
            if (appendedElement.is('form')) {
                enableSortableAndDroppable(appendedElement);
            }
        }
        if (component.beforeInit) {
            component.beforeInit(appendedElement.get(0));
        }
        Vvveb.Undo.addMutation(new ChildListMutation({
            target: appendedElement.get(0).parentNode,
            addedNodes: [...appendedElement],
            nextSibing: appendedElement[0].nextSibing
        }));
    }
}

const formItems = [
    textinputfieldid,
    datetimeinputfieldid,
    fileinputfieldid,
    autoselectinputfieldid,
    manualselectinputfieldid,
    multivalueselectinputfieldid,
    textareafieldid,
    radiofieldid,
    checkboxfieldid,
    buttonid
];

const popupFormItems = [
    popuptextinputid,
    popupmanualselectinputid
];

const customTables = [
    customtableid,
];

const gridDroppables = [
    formid,
    commontableid,
    gridrowid
];

const componentScopes = _.reduce({
    formItems,
    customTables,
    popupFormItems,
    gridDroppables
}, (prev, v, k) => {
    _.extend(prev, ...v.map(v => {
        const obj = {};
        obj[v] = k;
        return obj
    }));
    return prev;
}, {});

function initIframeTableDrop() {
    Vvveb.Builder.frameBody
        .find('.containerRight .allContent .topContent .container .row .everyBox .boxarea .userList #myGrid')
        .droppable({
            scope: 'customTables',
            drop
        });
}

function enableGridItemDrop(elements) {
    $(elements)
        .droppable({
            classes: {
                "ui-droppable-hover": "ui-state-hover"
            },
            scope: 'gridDroppables',
            drop
        });
}

function initIframeGridDrop() {
    enableGridItemDrop(Vvveb.Builder.frameBody.find('div.gridster > div'));
}

function initIframeFormItemsDrop() {
    Vvveb.Builder.frameBody
        .find('.allButton.dropzone')
        .droppable({
            greedy: true,
            scope: 'formItems',
            drop
        });
}

function initIframePopupDrop() {
    Vvveb.Builder.frameBody
        .find('div.popup-window form.popup-form')
        .droppable({
            greedy: true,
            scope: 'popupFormItems',
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

let sortingMutation;

function getNextSortableSiblingElement(target) {
    // exclude div.ui-sortable-placeholder
    return $(target).nextAll(sortableDivSelector).get(0);
}

function onSortingStarts(event, { item }) {
    const target = item.get(0);
    sortingMutation = new MoveMutation({
        target,
        oldParent: target.parentNode,
        oldNextSibling: getNextSortableSiblingElement(target)
    });
}

function onSortingUpdates(event, { item }) {
    const target = item.get(0);
    sortingMutation.newParent = target.parentNode;
    sortingMutation.newNextSibling = getNextSortableSiblingElement(target);
    Vvveb.Undo.addMutation(sortingMutation);
}

function initIfameFormSortable() {
    Vvveb.Builder.frameBody
        .find('.allButton.dropzone')
        .sortable({
            cursor: 'move',
            classes: {
                'ui-state-highlight': 'form-sortable-placeholder'
            },
            placeholder: 'ui-state-highlight',
            forcePlaceholderSize: true,
            // Prevents sorting if you start on elements matching the selector.
            // Default: "input,textarea,button,select,option"
            cancel: "button, option, div.ui-resizable-handle",
            start: onSortingStarts,
            update: onSortingUpdates
        });
}

function initIframePopupSortable() {
    Vvveb.Builder.frameBody
        .find('div.popup-window form.popup-form')
        .sortable({
            cursor: 'move',
            cancel: "button, option, div.ui-resizable-handle",
            start: onSortingStarts,
            update: onSortingUpdates
        });
}

function initIframeSortable() {
    initIfameFormSortable();
    initIframePopupSortable();
}

// Resizing element would create elements right above the resizable element,
// which could interfere with the sortable elements.
function initIframeResizeVetically() {
    Vvveb.Builder.frameBody
        .find('.resize-vertically')
        .resizable({
            handles: 's'
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
    initIframeTableDrop,
    initIframeGridDrop,
    initIframeFormItemsDrop,
    initIframePopupDrop,
    initIframeDrag,
    initComponentDragWithInteract,
    initIframeSortable,
    initIframeResizeVetically,
    enableSortableAndDroppable,
    enableGridItemDrop
};