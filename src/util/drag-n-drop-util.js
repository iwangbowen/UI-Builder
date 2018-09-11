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

function initDragAndDrop(item, component) {
    const html = component.dragHtml || component.html;
    const cursorAt = getCursorAt($(html));
    $(item).draggable({
        iframeFix: true,
        helper() {
            const $element = $(html).appendTo($('body'));
            $element.css({ 'z-index': 999 });
            return $element;
        },
        cursorAt
    });
}

function initTopPanelDrag() {
    $('#top-panel').draggable({
        iframeFix: true,
        axis: 'x',
        cursor: 'e-resize'
    });
}

export {
    initTopPanelDrag,
    initDragAndDrop
};