// 用于导入页面的情况
const content = `
<div class="fullpagearea">
    <div class="fullpagoutbox">
        <div id="carea" class="containerarea" style="margin-left: 0; width: 100%;">
            <div id="cleft" class="containerleft">
                <div style="clear:both;"></div>
                <form class="form-box" action="" style="height: 100%;">
                    <div class="searcharea">
                        <div class="siteOutbox">
                            <div class="everySite site-one">
                                <div class="Button-template" style="height: 100%;">
                                    <div class="allButton" style="height: calc(100% - 37px);">
                                        <!--搜索条件text开始-->
                                        <div class="allButton-text dropzone" style="height: 100%;">
                                        </div>
                                        <!--搜索条件text结束-->
                                        <!--搜索条件控件开始-->
                                        <div class="allButton-button dropzone" style="height: 100%;">
                                        </div>
                                        <!--搜索条件控件结束-->
                                        <div style="clear:both;"></div>
                                    </div>
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                    <!--//以上结构是为了方便模板制作-->
                    </div>
                    <div style="clear:both;"></div>
                    <div class="bottom-searchButton dropzone">
                        <button type="button" class="draggable" data-button-id data-component-id="html/button@oee">
                            <span class="glyphicon glyphicon-search">Search</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

let addContent = self.addContent || content;
let editContent = self.editContent || content;
let dialogType;
const addDialog = 'addDialog';
const editDialog = 'editDialog';

function replaceWithEscapedNewLines(text) {
    return text.replace(/[\n\r]/g, '\\n');
}

function getContent(type) {
    return $('.layui-layer-content').length && dialogType == type
        ? $('.layui-layer-content').html()
        : (type == addDialog ? addContent : editContent);;
}

function getContentWithEscapedNewLines(type) {
    return replaceWithEscapedNewLines(getContent(type));
}

function getAddContent() {
    return getContentWithEscapedNewLines(addDialog);
}

function getEditContent() {
    return getContentWithEscapedNewLines(editDialog);
}

function addData() {
    dialogType = addDialog;
    layer.open({
        type: 1,
        title: '增加',
        skin: 'layui-layer-rim', //加上边框
        area: ['290px', '400px'], //宽高
        scrollbar: false,
        zIndex: 15,
        content: addContent,
        cancel: function () {
            addContent = $('.layui-layer-content').html();
        }
    });
}

function editData() {
    dialogType = editDialog;
    dialogType = addDialog;
    layer.open({
        type: 1,
        title: '修改',
        skin: 'layui-layer-rim', //加上边框
        area: ['290px', '400px'], //宽高
        scrollbar: false,
        zIndex: 15,
        content: editContent,
        cancel: function () {
            editContent = $('.layui-layer-content').html();
        }
    });
}

function deleteData() {
}

function exportData() {

}

export { addData, editData, deleteData, exportData, getAddContent, getEditContent };