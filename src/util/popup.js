const isInBuilder = true;

function add() {
    layer.open({
        type: 1,
        title: '新增',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div.popup-window#add'),
        end: function () {
        }
    });
}

function edit() {
    if (isInBuilder) {
        layer.open({
            type: 1,
            title: '修改',
            area: ['600px', '350px'],
            skin: 'layui-layer-rim', //加上边框
            content: $('div.popup-window#edit'),
            end: function () {
            }
        });
    } else {
        layer.msg('请选择需要修改的数据', { icon: 5 });
    }
}

function batchDelete() {
    if (isInBuilder) {
        layer.confirm('您确定需要删除吗？', {
            btn: ['确定', '取消']
        }, function () {
        }, function () {
        });
    } else {
        layer.msg('请选择需要删除的数据', { icon: 5 });
    }
}

export {
    add,
    edit,
    batchDelete
};