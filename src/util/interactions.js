import Builder from '../gui/builder';
import Components from '../gui/components';
import Undo from '../gui/undo';
import ChildListMutation from '../models/mutation/child-list-mutation';
import extend from 'lodash/extend';
import 'core-js/es7/array';
import {
    droppableComponent, draggableComponent, resizableComponent, scaleOnResizeComponent, defaultWidthComponent,
    defaultWidthValue, defaultHeightValue, defaultHeightComponent, verticalScaleComponent, horizontalNonScaleComponent, sizeAutoChangeComponent
} from '../components/common';
import {
    getElementWithSpecifiedClass, changeOffset, isSelectedElement, getSelectedElements,
    getFunctionInIframe, clearSelectedElements
} from './dom';
import { componentBgImgHeight } from '../constants';
import MultiChildListMutation from '../models/mutation/multi-child-list-mutation';
import MoveMutation from '../models/mutation/move-mutation';
import MultiMoveMutation from '../models/mutation/multi-move-mutation';
import ResizeMutation from '../models/mutation/resize-mutation';
import MultiResizeMutation from '../models/mutation/multi-resize-mutation';

function initDraggableComponents(item, component) {
    const width = item.width();
    item.draggable(extend({}, draggableOptions, {
        iframeFix: true,
        // Use https://maxazan.github.io/jquery-ui-droppable-iframe/ to deal with
        // iframe scroll issue
        iframeScroll: true,
        start() {
            // Clear multi-selected elements
            clearSelectedElements();
        },
        drag: null,
        stop: null,
        helper() {
            const html = item.prop('outerHTML');
            const $element = $(html).appendTo($('body'));
            return $element;
        },
        // 108 is component li width, 42 is bg img height
        cursorAt: { left: 35, top: componentBgImgHeight / 2 },
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
    'ui-droppable-hover': 'ui-state-hover'
};

function convertSize(element, width = element.outerWidth(), height = element.outerHeight()) {
    // Convert to absolute unit or relative uite
    if (element.hasClass(scaleOnResizeComponent)) {
        const parent = element.parent();

        // Height default to not scale
        if (element.hasClass(verticalScaleComponent)) {
            height = `${height / parent.outerHeight() * 100}%`
        }
        // Width default to scale
        if (!element.hasClass(horizontalNonScaleComponent)) {
            width = `${width / parent.outerWidth() * 100}%`;
        }
        return {
            width,
            height
        };
    } else {
        if (element.hasClass(defaultWidthComponent)) {
            width = defaultWidthValue;
        }
        if (element.hasClass(defaultHeightComponent)) {
            height = defaultHeightValue;
        }
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

function getOffset(offset1, offset2) {
    return {
        left: offset1.left - offset2.left,
        top: offset1.top - offset2.top
    }
}

function offsetElement(element, { leftOffset, topOffset }) {
    const { left, top } = element.position();
    element.css({
        left: left + leftOffset,
        top: top + topOffset
    })
    return element;
}

function addOffset({ left, top }, { dx, dy }) {
    return {
        left: left + dx,
        top: top + dy
    };
}

function removeResizableHandles(element) {
    return element.find('div.ui-resizable-handle').remove();
}

function convertAndInitInteractionsRecursively(element) {
    convertAndInitInteractions(element, undefined, false);
    // Find draggable elements
    // because all interactive elements are all draggable
    element.find(`.${draggableComponent}`).each(function () {
        convertAndInitInteractions($(this), undefined, false);
    });
}

function cloneAndInit(original) {
    const multiChildListMutation = new MultiChildListMutation({
        type: 'Clone'
    });
    const clonedElements = [];
    original.each(function () {
        const $this = $(this);
        const $cloned = $(this).clone();
        const cloned = $cloned.get(0);
        const width = cloned.style.width;
        const height = cloned.style.height;
        $this.after(cloned);
        // Reserve width and height in percentage
        cloned.style.width = width;
        cloned.style.height = height;
        // Cloned elements would have resizable handles
        // which would interfere with cloned elements resizable
        removeResizableHandles($cloned);
        // Add left and top offset for cloned element
        offsetElement($cloned, {
            leftOffset: 25,
            topOffset: 25
        });
        convertAndInitInteractionsRecursively($cloned);

        clonedElements.push(cloned);
        multiChildListMutation.addChildListMutation(new ChildListMutation({
            target: this.parentNode,
            addedNodes: [cloned],
            nextSibling: null
        }));
    });
    Undo.addMutation(multiChildListMutation);
    return clonedElements;
}

function convertAndInitInteractions(element, position, convertSizeNeeded = true) {
    let width, height;
    if (convertSizeNeeded && !element.hasClass(sizeAutoChangeComponent)) {
        const convertedSize = convertSize(element);
        width = convertedSize.width;
        height = convertedSize.height;
        element.css({
            width,
            height
        });
    }
    // Use clone element as dragging element
    // Use current clone element position as appended element position
    const { left, top } = convertPositionInPercentage(element, position);
    element.css({
        position: 'absolute',
        left,
        top
    }).draggable(draggableOptions);
    if (element.hasClass(resizableComponent)) {
        element.resizable(resizableOptions);
    }
    if (element.hasClass(droppableComponent)) {
        element.droppable(droppableOptions);
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
        const component = Components.matchNode(helper.get(0));
        const appended = appendTo($(component.html), $(this));
        if (component.afterDrop) {
            component.afterDrop(appended.get(0));
        }
        // Use clone element as dragging element
        // Use current clone element position as appended element position
        // Compute droppable offset relative to the viewport and helper offset
        // which is offset bewteen helper and iframe
        // Subtract them to get offset bewteen draggable and droppable
        const droppableOffset = this.getBoundingClientRect();
        const helperOffset = getOffsetBetweenElements(helper, $('#iframeId'));
        appended.each((index, element) =>
            // Add horizontal offset if appended has more than one elements
            convertAndInitInteractions($(element), addOffset(getOffset(helperOffset, droppableOffset), { dx: 40 * index, dy: 0 }))
        );
        intiDroppableInContext(appended);
        if (component.beforeInit) {
            component.beforeInit(appended.get(0));
        }
        Undo.addMutation(new ChildListMutation({
            type: 'Add',
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

function initInteractions() {
    intiDroppableInContext();
    initDraggable();
    initResizable();
}

// Initilize this array when multi-selected drag starts
let selectedOffsetsRelativeToDraggable = [];
let selectedOriginalSizes = [];
let selectedOriginalPositions = [];
let multiResizeMutation;
let multiMoveMutation;

function addMutationOnResizeEnd() {
    multiResizeMutation.onResizeEnd();
    Undo.addMutation(multiResizeMutation);
}

function addMutationOnMoveEnd() {
    multiMoveMutation.onMoveEnd();
    Undo.addMutation(multiMoveMutation);
}

function initMultiResizeMutation(element) {
    multiResizeMutation = initMultiMutation(element, ResizeMutation, MultiResizeMutation, 'Resize');
}

function initMultiMoveMutation(element) {
    multiMoveMutation = initMultiMutation(element, MoveMutation, MultiMoveMutation, 'Move');
}

function initMultiMutation(element, Mutation, MultiMutation, type) {
    let elements = [];
    if (isSelectedElement(element)) {
        elements = getSelectedElements();
    } else {
        elements = [element];
    }
    return elements.reduce((prev, cur) => prev.addMutation(new Mutation({
        target: cur
    })), new MultiMutation({
        type
    }));
}

const draggableOptions = {
    cancel: 'option',
    start() {
        setChildrenDroppable($(this), 'disable');
        if (isSelectedElement(this)) {
            selectedOffsetsRelativeToDraggable = getSelectedElements()
                .map(selected => getOffsetBetweenElements($(this), $(selected)));
        }

        initMultiMoveMutation(this);
    },
    drag(e, { offset }) {
        hideAlignmentLines();
        if (isSelectedElement(this)) {
            // offset refers to draggable element offset which is not applied to
            // the draggable element yet
            getSelectedElements()
                .forEach((selected, index) => {
                    const $selected = $(selected);
                    const { left: dx, top: dy } = selectedOffsetsRelativeToDraggable[index];
                    $selected.offset(addOffset(offset, {
                        dx: -dx,
                        dy: -dy
                    }));
                });
        }
        showAlignmentLines(this);
    },
    stop() {
        hideAlignmentLines();
        setChildrenDroppable($(this), 'enable');
        if (isSelectedElement(this)) {
            getSelectedElements()
                .forEach(selected => {
                    applyPositionInPercentage($(selected));
                });
        }

        addMutationOnMoveEnd();
    }
};

const droppableOptions = {
    // Prevent top center draggable menu bar from being dropped
    accept(draggable) {
        return draggable.attr('id') !== 'top-panel';
    },
    greedy: true,
    classes: droppableClasses,
    drop: onDrop
};

const resizableOptions = {
    cancel: 'textarea,select,option',
    handles: 'all',
    start() {
        if (isSelectedElement(this)) {
            const $selected = getSelectedElements().map($);
            selectedOriginalSizes = $selected.map(selected => ({
                width: selected.width(),
                height: selected.height()
            }));
            selectedOriginalPositions = $selected.map(selected => selected.position());
        }

        initMultiResizeMutation(this);
    },
    resize(e, { size, originalSize, position, originalPosition }) {
        hideAlignmentLines();
        if (isSelectedElement(this)) {
            // four directions: n, s, w, s
            const leftChanged = position.left - originalPosition.left != 0;
            const topChanged = position.top - originalPosition.top != 0;
            const widthRatio = size.width / originalSize.width;
            const heightRatio = size.height / originalSize.height;
            getSelectedElements()
                .forEach((selected, index) => {
                    const $selected = $(selected);
                    const originalSize = selectedOriginalSizes[index];
                    let { left, top } = selectedOriginalPositions[index];
                    const width = originalSize.width * widthRatio;
                    const height = originalSize.height * heightRatio;
                    const dx = width - originalSize.width;
                    const dy = height - originalSize.height;
                    if (leftChanged) {
                        left -= dx;
                    }
                    if (topChanged) {
                        top -= dy;
                    }
                    $selected
                        .width(width)
                        .height(height)
                        .css({
                            left,
                            top
                        });
                });
        }
        showAlignmentLines(this, false);
    },
    stop(e, { element }) {
        hideAlignmentLines();
        let elements = [];
        if (isSelectedElement(this)) {
            elements = getSelectedElements().map($);
        } else {
            elements = [element];
        }
        elements.forEach(element => {
            const { width, height } = convertSize(element);
            element.css({
                width,
                height
            });
        });

        addMutationOnResizeEnd();
    }
};

function initDraggable() {
    Builder.frameHtml.find(`.${draggableComponent}`)
        .draggable(draggableOptions);
}

function initResizable() {
    Builder.frameHtml.find('body')
        .resizable(extend({}, resizableOptions, {
            handles: 's'
        }))
    Builder.frameHtml.find(`.${resizableComponent}`)
        .resizable(resizableOptions);
}

function arrayKeyPressed(key, element) {
    hideAlignmentLines();
    changeOffset();
    element = getElementWithSpecifiedClass(element);
    let elements = [];
    if (getSelectedElements().length) {
        elements = getSelectedElements().map($);
    } else {
        elements = [element];
    }

    initMultiMoveMutation(element.get(0));

    elements.forEach(element => {
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
        showAlignmentLines(element.get(0));
        applyPositionInPercentage(element, { left, top });
    });

    addMutationOnMoveEnd();
}


function setDroppableBySelector(option, containerSelector) {
    if (containerSelector) {
        setDroppable(Builder.frameHtml.find(`${containerSelector} .${droppableComponent}`), option);
    } else {
        setDroppable(Builder.frameHtml.find(`.${droppableComponent}`), option);
    }
}

function setDroppable(elements, option) {
    elements.droppable(option);
}

function setDraggable(elements, option) {
    elements.draggable(option);
}

function setChildrenDroppable(element, option) {
    setDroppable(element.find(`.${droppableComponent}`), option);
}

function intiDroppableInContext(context = Builder.frameHtml) {
    context.find(`.${droppableComponent}`)
        .droppable(droppableOptions);
}

function initDroppable(element) {
    $(element).droppable(droppableOptions);
}

function showAlignmentLines(element, adjust) {
    return getFunctionInIframe('showAlignmentLines')(element, adjust);
}

function hideAlignmentLines() {
    return getFunctionInIframe('hideAlignmentLines')();
}

export {
    initTopPanelDrag,
    initDraggableComponents,
    intiDroppableInContext,
    initInteractions,
    offsetElement,
    removeResizableHandles,
    applyPositionInPercentage,
    arrayKeyPressed,
    setDroppableBySelector,
    setDraggable,
    convertAndInitInteractionsRecursively,
    hideAlignmentLines,
    cloneAndInit,
    initDroppable
};