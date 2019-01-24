import {
    undoHistoryFooterId, undoHistoryId, undoHistoryBtnId,
    undoHistoryDividerId
} from '../shared';
import Undo from './undo';

const undoHistoryBtn = $(`#${undoHistoryBtnId}`);
const undoHistory = $(`#${undoHistoryId}`);
const undoHistoryDivider = $(`#${undoHistoryDividerId}`);
const undoHistoryFooter = $(`#${undoHistoryFooterId}`);

function isUndoHistoryFooter(node) {
    return node.attr('id') === undoHistoryFooterId;
};

function setUndoHistroyButtonDisabled() {
    if (Undo.undoIndex >= 0) {
        undoHistoryBtn.removeAttr('disabled');
    } else {
        undoHistoryBtn.attr('disabled', 'disabled');
    }
}

function getUndoHistory() {
    const history = Undo.getUndoHistory();
    return history.reverse().reduce((prev, cur) =>
        `${prev}<a class="dropdown-item" href="#">${cur.type}</a>`, '');
}

function setUndoHistoryFooterToCancel() {
    undoHistoryFooter.text('Cancel');
}

function showUndoHistory() {
    setUndoHistoryFooterToCancel();
    undoHistoryDivider.prev().html(getUndoHistory());
}

undoHistory.on('mouseover', 'a', function () {
    const $this = $(this);
    $this.siblings('a').add($this).removeClass('active disabled')
    if (isUndoHistoryFooter($this)) {
        setUndoHistoryFooterToCancel();
    } else {
        $this.prevAll().addClass('disabled');
        undoHistoryFooter.text(`Undo last ${$this.index() + 1} steps`);
        $this.addClass('active');
    }
});

undoHistory.on('click', 'a', function () {
    const $this = $(this);
    if (!isUndoHistoryFooter($this)) {
        Undo.undoBySteps($this.index());
    }
})

function toggleDropdown() {
    $(`#${undoHistoryBtnId}.dropdown-toggle`).dropdown('toggle');
}

function closeDropdown() {
    if (undoHistory.hasClass('show')) {
        toggleDropdown();
    }
}

export {
    toggleDropdown,
    showUndoHistory,
    setUndoHistroyButtonDisabled,
    closeDropdown
};