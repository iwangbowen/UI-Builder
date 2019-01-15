import { hideToolBoxes } from './iframe-drag-n-drop';
import { addOrEditPopupFormSelector, getDetailPopupIdSelector } from '../common';
import wrap from 'lodash/wrap';
import isElement from 'lodash/isElement';

function setDroppable(option, containerSelector) {
    window.parent.setDroppable(option, containerSelector);
}

// Fix bugs in nested detail popup windows
// Disable droppable when all opened popup windows have been closed
const detailPopups = [];

function wrapper(func, popup = $(`${addOrEditPopupFormSelector}`), url, data) {
    hideToolBoxes();
    setDroppable('disable');
    detailPopups.push(popup);
    setDroppable('enable',getDetailPopupIdSelector(popup));
    return func(popup, url, data);
}

function end() {
    $('div.popup-window#add form').trigger('reset');
    $('div.popup-window#edit form').trigger('reset');

    detailPopups.pop();
    if (detailPopups.length) {
        setDroppable('enable', getDetailPopupIdSelector(detailPopups[detailPopups.length - 1]));
    } else {
        setDroppable('enable');
    }
}

function _popupCommon(popup) {
    layer.open({
        type: 1,
        title: '信息',
        area: ['660px', '330px'],
        skin: 'layui-layer-rim', //加上边框
        content: popup,
        end
    });
}

const [popupCommon] =
    [_popupCommon]
        .map(func => wrap(func, wrapper));

export {
    popupCommon
};