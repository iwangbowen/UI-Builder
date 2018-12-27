function popupCommon(popup) {
    layer.open({
        type: 1,
        title: '信息',
        area: ['660px', '330px'],
        skin: 'layui-layer-rim', //加上边框
        content: popup,
        end: function () {
        }
    });
}

export {
    popupCommon
};