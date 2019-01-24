import 'core-js/es6/array';
import SortMutation from '../models/mutation/sort-mutation';
import { popupCommon } from './popup-in-builder';
import { tableSelector } from './selectors';
import { dataTableId, dataComponentId } from '../components/common';
import { dummyData, gridOptions, tooltipOptions } from '../common';
import { tabsid, commontableid } from '../components/@common/ids';

function hideAuxiliaryElementsInParent() {
    window.parent
        && window.parent.hideAuxiliaryElements
        && window.parent.hideAuxiliaryElements();
}

function hideAlignmentLines() {
    $('.horizontal-line, .vertical-line').hide();
}

function hideHighlightAreas() {
    $(window.parent.document).find('#select-box, #highlight-box').hide();
}

function getRect(element) {
    const rect = element.getBoundingClientRect();
    rect.center = rect.left + (rect.right - rect.left) / 2;
    rect.middle = rect.top + (rect.bottom - rect.top) / 2;
    return rect;
}

const closeEnough = 1;

function findCloseEnoughDistance(distance, ...distances) {
    return distances.find(value => Math.abs(distance - value) < closeEnough);
}

function findCloseEnoughDistanceBetweenRects(targetRect, elementRect, side) {
    const horizontalDistances = [elementRect.left, elementRect.center, elementRect.right];
    const verticalDistances = [elementRect.top, elementRect.middle, elementRect.bottom];
    if (isVerticalSide(side)) {
        return findCloseEnoughDistance(targetRect[side], ...horizontalDistances);
    } else {
        return findCloseEnoughDistance(targetRect[side], ...verticalDistances);
    }
}

function showVerticalLine(verticalLine, left) {
    verticalLine.css({
        left
    }).show();
}

function showHorizontalLine(horizontalLine, top) {
    horizontalLine.css({
        top
    }).show();
}

function isVerticalSide(side) {
    return side === 'left' || side === 'center' || side === 'right';
}

function getLine(side) {
    switch (side) {
        case 'left':
            return leftVerticalLine;
        case 'center':
            return centerVerticalLine;
        case 'right':
            return rightVerticalLine;
        case 'top':
            return topHorizontalLine;
        case 'middle':
            return middleHorizontalLine;
        case 'bottom':
            return bottomHorizontalLine;
    }
}

// Return distance if find close enough distance or undefined
function showLineIfCloseEnough(targetRect, elementRect, side) {
    const distance = findCloseEnoughDistanceBetweenRects(targetRect, elementRect, side);
    if (distance) {
        if (isVerticalSide(side)) {
            showVerticalLine(getLine(side), distance);
        } else {
            showHorizontalLine(getLine(side), distance);
        }
    }
    return distance;
}

function repositionAndShowLineIfCloseEnough(target, elementRect, side) {
    const targetRect = getRect(target);
    return showLineIfCloseEnough(targetRect, elementRect, side);
}

function getSideFromDistance(rect, direction, distance) {
    if (direction === 'vertical') {
        if (rect.left === distance) {
            return 'left';
        } else if (rect.right === distance) {
            return 'right';
        } else if (rect.center === distance) {
            return 'center';
        }
    } else {
        if (rect.top === distance) {
            return 'top';
        } else if (rect.bottom === distance) {
            return 'bottom';
        } else if (rect.middle === distance) {
            return 'middle';
        }
    }
}

function showLines(targetRect, elementRect, target, element, direction, adjust) {
    let side, otherSide, middleSide, span;
    if (direction === 'vertical') {
        side = 'left';
        otherSide = 'right';
        middleSide = 'center';
        span = 'width';
    } else {
        side = 'top';
        otherSide = 'bottom';
        middleSide = 'middle';
        span = 'height';
    }
    let distance = showLineIfCloseEnough(targetRect, elementRect, side);
    if (distance) {
        if (adjust) {
            // Adjust position
            const elementSide = getSideFromDistance(elementRect, direction, distance);
            target.style[side] = element.style[elementSide];
        }
        // Get target new rect
        return repositionAndShowLineIfCloseEnough(target, elementRect, otherSide);
    } else {
        distance = showLineIfCloseEnough(targetRect, elementRect, otherSide);
        if (distance) {
            if (adjust) {
                const elementSide = getSideFromDistance(elementRect, direction, distance);
                // Right or bottom alignment
                // target left or top should equal to
                // element current alignment side minus target width or height
                target.style[side] = elementRect[elementSide] - targetRect[span];
            }
            return repositionAndShowLineIfCloseEnough(target, elementRect, side);
        } else {
            return showLineIfCloseEnough(targetRect, elementRect, middleSide);
        }
    }
}

function showVerticalLines(targetRect, elementRect, target, element, adjust) {
    return showLines(targetRect, elementRect, target, element, 'vertical', adjust);
}

function showHorizontalLines(targetRect, elementRect, target, element, adjust) {
    return showLines(targetRect, elementRect, target, element, 'horizontal', adjust);
}

function showAlignmentLines(target, adjust = true) {
    let targetRect = getRect(target);
    let horizontalLinesShown = false;
    let verticalLinesShown = false;
    // 排除自身元素和该元素子元素
    // Exclude target, target children elemetns,
    // resizable-handle elements,
    // table children elements
    Array.from($('body *:visible:not(script)')
        .not(target)
        .not($(target).find('*'))
        .not('div.ui-resizable-handle')
        .not(`div[${dataComponentId}="${commontableid}"] *`))
        .some(element => {
            const elementRect = getRect(element);

            verticalLinesShown = showVerticalLines(targetRect, elementRect, target, element, adjust);
            horizontalLinesShown = showHorizontalLines(targetRect, elementRect, target, element, adjust);
            return horizontalLinesShown && verticalLinesShown;
        });
}

let leftVerticalLine, centerVerticalLine, rightVerticalLine, topHorizontalLine,
    middleHorizontalLine, bottomHorizontalLine;

function initAlignmentLines() {
    const body = $('body');
    leftVerticalLine = $('<hr />').addClass('vertical-line left-vertical-line').css({
        display: 'none'
    }).appendTo(body);
    centerVerticalLine = $('<hr />').addClass('vertical-line center-vertical-line').css({
        display: 'none'
    }).appendTo(body);
    rightVerticalLine = $('<hr />').addClass('vertical-line right-vertical-line').css({
        display: 'none'
    }).appendTo(body);


    topHorizontalLine = $('<hr />').addClass('horizontal-line top-horizontal-line').css({
        display: 'none'
    }).appendTo(body);
    middleHorizontalLine = $('<hr />').addClass('horizontal-line middle-horizontal-line').css({
        display: 'none'
    }).appendTo(body);
    bottomHorizontalLine = $('<hr />').addClass('horizontal-line bottom-horizontal-line').css({
        display: 'none'
    }).appendTo(body);
}

function arrowKeyMove(key, element) {
    element = window.parent.getElementWithSpecifiedClass(element);
    hideAlignmentLines();
    hideHighlightAreas();
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
    showAlignmentLines(element.get(0));
}

function updatePosition(target, event) {
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function getAttributes(element) {
    return Array.from(element.attributes)
        .reduce((attrs, attr) => {
            attrs[attr.name] = attr.value;
            return attrs
        }, {});
}

function isDropzoneParent(element) {
    return !!$(element).parents('.dropzone').length;
}

function initDropzone() {
    let enteredDropzone = false;
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
}

function resizeMove(event) {
    let target = event.target,
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
}

function initResizeDrag() {
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
        .on('resizemove', resizeMove);
}

function initDraggable() {
    let mutation;
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
                mutation = new SortMutation({
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
}

function setTableDummyData() {
    $(tableSelector).each((_, element) => {
        window[`${gridOptions}${$(element).attr(dataTableId)}`].api.setRowData(dummyData);
    });
}

function setGlobalVariables() {
    self.showAlignmentLines = showAlignmentLines;
    self.hideAlignmentLines = hideAlignmentLines;
    self.popupCommon = popupCommon;
}

// Remove base tag after document loaded to work around jQuery UI Tab
function removeBaseTag() {
    $('head base').remove();
}

function initTabs() {
    $(`[${dataComponentId}="${tabsid}"]`).tabs();
}

function initTooltip() {
    $('input, select, textarea').tooltip(tooltipOptions);
}

export {
    hideAlignmentLines, arrowKeyMove, showAlignmentLines, updatePosition, hideHighlightAreas,
    getAttributes, initDropzone, initResizeDrag, initDraggable, setGlobalVariables,
    setTableDummyData, hideAuxiliaryElementsInParent, removeBaseTag, initTabs, initTooltip,
    initAlignmentLines
};