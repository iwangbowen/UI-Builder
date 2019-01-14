import Vvveb from '../gui/components';
import ChildListMutation from '../models/mutation/child-list-mutation';
import extend from 'lodash/extend';
import 'core-js/es7/array';
import { droppableComponent, draggableComponent, resizableComponent, scaleOnResizeComponent } from '../components/common';
import { getElementWithSpecifiedClass, changeOffset } from './dom';

function initDraggableComponents(item, component) {
    item.draggable(extend({}, draggableOptions, {
        iframeFix: true,
        // Use https://maxazan.github.io/jquery-ui-droppable-iframe/ to deal with
        // iframe scroll issue
        iframeScroll: true,
        helper() {
            const html = item.prop('outerHTML');
            const $element = $(html).appendTo($('body'));
            return $element;
        },
        // 108 is component li width, 42 is bg img height
        cursorAt: { left: 108 / 2, top: 42 / 2 },
        revert: 'invalid'
    }))
}

function initTopPanelDrag() {
    $('#top-panel').draggable({
        iframeFix: true,
        axis: 'x',
        cursor: 'e-resize',
        containment: "parent"
    });
}

const droppableClasses = {
    "ui-droppable-hover": "ui-state-hover"
};

function drop(event, { draggable, helper, offset }) {
    // Check drag elements from inside or out of iframe
    if (draggable == helper) {
        $(this).append(draggable);
    } else {
        const component = Vvveb.Components.matchNode(helper.get(0));
        let appendedElement;
        if (component.getDropHtml) {
            helper = $(component.getDropHtml()).replaceAll(helper);
        }
        if (component.onDrop) {
            appendedElement = component.onDrop(helper);
        }
        if (!component.droppable && component.sortable) {
            // Check if the drop zone is popup form
            // Remove div.saveArea and be compatible
            if ($(this).is('form.popup-form') && $(this).find('.saveArea').length) {
                appendedElement = cloneAndInsertBefore(helper, $(this).find('.saveArea'));
            } else if (component.getDropHtml) {
                appendedElement = appendTo(helper, this);
            } else {
                appendedElement = cloneAndAppendTo(helper, this);
            }
        } else {
            appendedElement = (component.getDropHtml
                ? appendTo : cloneAndAppendTo)(helper, this, {
                    position: '',
                    left: 0,
                    top: 0,
                    width: component.width || '100%',
                    height: component.height || '100%',
                });
            if (appendedElement.is('form')) {
                enableSortableAndDroppable(appendedElement);
            } else if (appendedElement.is('div.row')) {
                enableSortableAndDroppable(appendedElement.children());
            } else if (component.droppable || component.sortable) {
                enableSortableAndDroppable(appendedElement, undefined, undefined, component.droppable, component.sortable);
            }
        }
        if (component.afterDrop) {
            component.afterDrop(appendedElement.get(0));
        }
        if (component.beforeInit) {
            component.beforeInit(appendedElement.get(0));
        }
        if (component.resizable) {
            appendedElement.resizable(agGridResizableOptions);
        }
        if (component.isChildrenSortableAndDroppable) {
            enableSortableAndDroppable(appendedElement.children(component.sortableAndDroppableSelector));
        }
        Vvveb.Undo.addMutation(new ChildListMutation({
            target: appendedElement.get(0).parentNode,
            addedNodes: [...appendedElement],
            nextSibing: appendedElement[0].nextSibing
        }));
    }
}

function convertSize(element, width = element.outerWidth(), height = element.outerHeight()) {
    // Convert to absolute unit or relative uite
    if (element.hasClass(scaleOnResizeComponent)) {
        const parent = element.parent();
        return {
            width: `${width / parent.outerWidth() * 100}%`,
            height: `${height / parent.outerHeight() * 100}%`
        };
    } else {
        return {
            width,
            height
        };
    }
}

function convertPositionInPercentage(element, position = element.position()) {
    const parent = element.parent();
    const { left, top } = position;
    return {
        left: `${left / parent.width() * 100}%`,
        top: `${top / parent.height() * 100}%`
    }
}

function applyPositionInPercentage(element, position) {
    const { left, top } = convertPositionInPercentage(element, position);
    element.css({
        left,
        top
    });
}

function onResizableStop(e, { element }) {
    const { width, height } = convertSize(element);
    element.css({
        width,
        height
    });
}

function getOffsetBetweenElements(a, b) {
    return {
        left: a.offset().left - b.offset().left,
        top: a.offset().top - b.offset().top
    };
}

function offsetElement(element, { leftOffset, topOffset }) {
    const { left, top } = element.position();
    element.css({
        left: left + leftOffset,
        top: top + topOffset
    })
    return element;
}

function removeResizableHandles(element) {
    return element.find('div.ui-resizable-handle').remove();
}

function convertAndInitInteractions(element, position) {
    const { width, height } = convertSize(element);
    // Use clone element as dragging element
    // Use current clone element position as appended element position
    const { left, top } = convertPositionInPercentage(element, position);
    element.css({
        position: 'absolute',
        width,
        height,
        left,
        top
    }).draggable(draggableOptions);
    if (element.hasClass(resizableComponent)) {
        element.resizable(resizableOptions);
    }
    if (element.hasClass(droppableComponent)) {
        element.droppable({
            greedy: true,
            classes: droppableClasses,
            drop: onDrop
        });
    }
}

// Use appendTo wrapper to deal with body as container
function appendTo(element, container) {
    if (container.find('script').length) {
        return element.insertBefore(container.find('script:first'));
    } else {
        return element.appendTo(container);
    }
}

function onDrop(event, { draggable, helper, offset, position }) {
    // Drag elemetn from component list
    if (draggable !== helper) {
        const component = Vvveb.Components.matchNode(helper.get(0));
        const appended = appendTo($(component.html), $(this));
        // Use clone element as dragging element
        // Use current clone element position as appended element position
        convertAndInitInteractions(appended, getOffsetBetweenElements(helper, $(this)));
        if (component.afterDrop) {
            component.afterDrop(appended.get(0));
        }
        if (component.beforeInit) {
            component.beforeInit(appended.get(0));
        }
        Vvveb.Undo.addMutation(new ChildListMutation({
            target: appended.get(0).parentNode,
            addedNodes: [...appended],
            nextSibing: appended[0].nextSibing
        }));
    } else {
        if (draggable.parent().is(this)) {
            applyPositionInPercentage(draggable);
        } else {
            // Compute width and height in pixel and position bewteen draggable and droppale before append
            const initWidth = draggable.outerWidth();
            const initHeight = draggable.outerHeight();
            const position = getOffsetBetweenElements(draggable, $(this));

            appendTo(draggable, $(this));
            const { width, height } = convertSize(draggable, initWidth, initHeight);
            const { left, top } = convertPositionInPercentage(draggable, position);
            draggable.css({
                width,
                height,
                left,
                top
            });
        }
    }
}

function initDroppableComponents(elements) {
    Vvveb.Builder.frameHtml.find('body')
        .droppable({
            greedy: true,
            classes: droppableClasses,
            drop: onDrop
        });
}

function initInteractions() {
    initDroppable();
    initDraggable();
    initResizable();
}

function initDroppable() {
    Vvveb.Builder.frameHtml.find(`.${droppableComponent}`)
        .droppable({
            greedy: true,
            classes: droppableClasses,
            drop: onDrop
        })
}

const draggableOptions = {
    cancel: 'input,textarea,select,option'
};

const resizableOptions = {
    cancel: 'input,textarea,select,option',
    handles: 'all',
    stop: onResizableStop
};

function initDraggable() {
    Vvveb.Builder.frameHtml.find(`.${draggableComponent}`)
        .draggable(draggableOptions);
}

function initResizable() {
    Vvveb.Builder.frameHtml.find('body')
        .resizable(extend({}, resizableOptions, {
            handles: 's'
        }))
    Vvveb.Builder.frameHtml.find(`.${resizableComponent}`)
        .resizable(resizableOptions);
}

function arrayKeyPressed(key, element) {
    changeOffset();
    element = getElementWithSpecifiedClass(element);
    let { left, top } = element.position();
    switch (key) {
        case 37: // left
            left -= 1;
            break;
        case 38: // up
            top -= 1;
            break;
        case 39: // right
            left += 1;
            break;
        case 40: // down
            top += 1;
            break;
        default: return; // exit this handler for other keys
    }
    applyPositionInPercentage(element, { left, top });
}

export {
    initTopPanelDrag,
    initDraggableComponents,
    initDroppableComponents,
    initInteractions,
    offsetElement,
    convertAndInitInteractions,
    removeResizableHandles,
    applyPositionInPercentage,
    arrayKeyPressed
};