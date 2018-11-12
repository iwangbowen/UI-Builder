import { hideToolBoxes } from './iframe-drag-n-drop';
import { gridItemsSelector } from '../common';

function disableDroppable() {
    window.parent.disableDroppable(gridItemsSelector);
}

function enableDroppable() {
    window.parent.enableDroppable(gridItemsSelector);
}

function popupAdd() {
    layer.open({
        type: 1,
        title: '新增',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div.popup-window#add'),
        end: function () {
            $('div.popup-window#add form').trigger('reset');
            enableDroppable();
        }
    });
}

// url and data are only used out of UI Builder,
// which can be used to query detail and show the result in popup window
function popupDetail(url, data, popup) {
    disableDroppable();
    // Compatible with previous only one detail popup window
    var content = popup && popup.length ? popup : $('div.popup-window#detail');
    hideToolBoxes();
    layer.open({
        type: 1,
        title: '信息',
        area: ['660px', '330px'],
        skin: 'layui-layer-rim', //加上边框
        content: content,
        end: function () {
            enableDroppable();
        }
    });
}

function popupEdit() {
    disableDroppable();
    layer.open({
        type: 1,
        title: '修改',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div.popup-window#edit'),
        end: function () {
            $('div.popup-window#edit form').trigger('reset');
            enableDroppable();
        }
    });
}

function popupDelete() {
    disableDroppable();
    layer.confirm('您确定需要删除吗？', {
        btn: ['确定', '取消']
    }, function () {
    }, function () {
        enableDroppable();
    });
}

function exportData() {
}

export {
    popupAdd,
    popupEdit,
    popupDelete,
    popupDetail,
    exportData
};