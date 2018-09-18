function add() {
    layer.open({
        type: 1,
        title: '新增',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div#add').css('display', 'block').prop('outerHTML'),
        end: function () {
        }
    });
}

function edit() {
    layer.open({
        type: 1,
        title: '修改',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div#edit'),
        end: function () {
        }
    });
}

function batchDelete() {

}

export {
    add,
    edit,
    batchDelete
};