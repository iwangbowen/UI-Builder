function template(el) {
    return `
    var addContent = '${document.getElementById('iframeId').contentWindow.getAddContent()}';
    function addData() {
        layer.open({
            type: 1,
            title: '增加',
            skin: 'layui-layer-rim', //加上边框
            area: ['290px', '400px'], //宽高
            scrollbar: false,
            zIndex: 15,
            content: addContent
          });
    }
    var editContent = '${document.getElementById('iframeId').contentWindow.getEditContent()}';
    function editData() {
        layer.open({
            type: 1,
            title: '修改',
            skin: 'layui-layer-rim', //加上边框
            area: ['290px', '400px'], //宽高
            scrollbar: false,
            zIndex: 15,
            content: editContent
          });
    }`;
}

export default template;