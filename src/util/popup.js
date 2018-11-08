const isInBuilder = true;

function hideToolBoxes() {
    window.parent
        && window.parent.hideAuxiliaryElements
        && window.parent.hideAuxiliaryElements();
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
        }
    });
}

// url and data are only used out of UI Builder,
// which can be used to query detail and show the result in popup window
function popupDetail(url, data) {
    var openPopup = function () {
        layer.open({
            type: 1,
            title: '信息',
            area: ['660px', '330px'],
            skin: 'layui-layer-rim', //加上边框
            content: $('div.popup-window#detail'),
            end: function () {
            }
        });
    };
    function setValues() {

    }
    if ($('div.popup-window#detail').length) {
        if (isInBuilder) {
            hideToolBoxes();
            openPopup();
        } else {
            if (url && data) {
                $.ajax({
                    url: config.fundodooApiDomainUrl + url,
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded',
                    method: 'POST',
                    async: true,
                    traditional: true,
                    data: data,
                    fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                    success: function (response) {
                        $('div.popup-window#detail').find('[data-component-id="html/labelfield@oee"]')
                            .each(function (_, element) {
                                const key = $(element).children('span:first-child').attr('data-key-mapping');
                                if (key) {
                                    $(element).children('span:last-child').text(response.data[key]);
                                }
                            });
                        var image = $('div.popup-window#detail').find('img');
                        image.attr('src', 'data:image/' + image.attr('data-image-format') + ';base64,' + response.data[image.attr('data-key-mapping')]);
                        openPopup();
                    },
                    error: function () {
                    }
                });
            }
        }
    }
}

function popupEdit() {
    var openPopup = function () {
        layer.open({
            type: 1,
            title: '修改',
            area: ['600px', '350px'],
            skin: 'layui-layer-rim', //加上边框
            content: $('div.popup-window#edit'),
            end: function () {
                $('div.popup-window#edit form').trigger('reset');
            }
        });
    };
    var setFormValues = function (selectedRow) {
        $('div.popup-window#edit form')
            .find('input:not([type=submit]), select')
            .each(function () {
                var field = $(this).attr('data-row-field') || $(this).attr('name');
                $(this).val(selectedRow[field]);
            })
    };
    if (isInBuilder) {
        openPopup();
    } else {
        if (grids.length) {
            var selectedRows = grids[0].gridOptions.api.getSelectedRows();
            if (selectedRows.length == 0) {
                layer.msg('请选择需要修改的数据', { icon: 5 });
            } else if (selectedRows.length > 1) {
                layer.msg('只允许同时修改一条数据', { icon: 5 });
            } else {
                setFormValues(selectedRows[0]);
                openPopup();
            }
        } else {
            layer.msg('请选择需要修改的数据', { icon: 5 });
        }
    }
}

function popupDelete() {
    var openPopup = function () {
        layer.confirm('您确定需要删除吗？', {
            btn: ['确定', '取消']
        }, function () {
            if (!isInBuilder) {
                $.ajax({
                    url: config.fundodooApiDomainUrl + $('button#delete').attr('data-url'),
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded',
                    method: 'POST',
                    async: true,
                    traditional: true,
                    data: grids[0].gridOptions.api.getSelectedRows(),
                    fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                    success: function () {
                        layer.closeAll();
                        query();
                    },
                    error: function () {
                    }
                });
            }
        }, function () {
        });
    };
    if (isInBuilder) {
        openPopup();
    } else {
        if (grids.length) {
            var selectedRows = grids[0].gridOptions.api.getSelectedRows();
            if (selectedRows.length == 0) {
                layer.msg('请选择需要删除的数据', { icon: 5 });
            } else {
                openPopup();
            }
        } else {
            layer.msg('请选择需要删除的数据', { icon: 5 });
        }
    }
}

function exportData() {
    if (!isInBuilder) {
        if (grids.length) {
            grids[0].gridOptions.api.exportDataAsCsv();
        }
    }
}

export {
    popupAdd,
    popupEdit,
    popupDelete,
    popupDetail,
    exportData,
    hideToolBoxes
};