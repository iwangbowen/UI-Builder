import Vvveb from '../gui/components';
import ChildListMutation from '../models/mutation/child-list-mutation';

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

function drop(event, { helper, offset }) {
    const component = Vvveb.Components.matchNode(helper);
    let appendedElement;
    if (component.onDrop) {
        appendedElement = component.onDrop(helper);
    } else {
        appendedElement = $(this).append(helper.prop("outerHTML"))
            .children('*:last')
            .offset(offset);
    }
    Vvveb.Undo.addMutation(new ChildListMutation({
        target: appendedElement.get(0).parentNode,
        addedNodes: [...appendedElement],
        nextSibing: appendedElement[0].nextSibing
    }));
}

function initIframeDrop() {
    Vvveb.Builder.frameBody.droppable({
        drop
    });
}

function initIframeFormDrop() {
    Vvveb.Builder.frameBody
        .find('.allButton.dropzone')
        .droppable({
            greedy: true,
            drop
        });
}

export {
    initTopPanelDrag,
    initComponentDrag,
    initIframeDrop,
    initIframeFormDrop
};