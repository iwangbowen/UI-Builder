import 'core-js/es6/array';

function isAlign(targetOffset, currentOffset) {
    return {
        isHorizontalAlign: Math.abs(targetOffset.top - currentOffset.top) <= 0.7,
        isVerticalAlign: Math.abs(targetOffset.left - currentOffset.left) <= 0.7
    };
}

function hideAlignmentLines() {
    $('.horizontal-line, .vertical-line').hide();
}

function hideHighlightAreas() {
    $(window.parent.document).find('#select-box, #highlight-box').hide();
}

let horizontalLineCreated = false;
let verticalLineCreated = false;
let horizontalLine;
let verticalLine;

function showAlignmentLines(target) {
    let horizontalLineShown = false;
    let verticalLineShown = false;
    const targetOffset = $(target).offset();
    // 排除自身元素和该元素子元素
    Array.from($('body *:visible:not(script)')
        .not(target)
        .not($(target).find('*')))
        .some(currentValue => {
            const currentOffset = $(currentValue).offset();
            const { isHorizontalAlign, isVerticalAlign } = isAlign(targetOffset, currentOffset);
            if (!horizontalLineShown && isHorizontalAlign) {
                if (horizontalLineCreated) {
                    horizontalLine
                        .css({
                            top: targetOffset.top
                        })
                        .show();
                } else {
                    horizontalLine = $('<hr />')
                        .addClass('horizontal-line')
                        .css({
                            top: targetOffset.top
                        })
                        .appendTo($('body'));
                }
                horizontalLineShown = true;
            }
            if (!verticalLineShown && isVerticalAlign) {
                if (verticalLineCreated) {
                    verticalLine
                        .css({
                            left: targetOffset.left
                        })
                        .show();
                } else {
                    verticalLine = $('<hr />')
                        .addClass('vertical-line')
                        .css({
                            left: targetOffset.left
                        })
                        .appendTo($('body'));
                }
                verticalLineShown = true;
            }
            return horizontalLineShown && verticalLineShown;
        });
}

function arrowKeyMove(key, element) {
    element = window.parent.getElementWithDraggable(element);
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

export {
    hideAlignmentLines, arrowKeyMove, showAlignmentLines, updatePosition, hideHighlightAreas,
    getAttributes
};