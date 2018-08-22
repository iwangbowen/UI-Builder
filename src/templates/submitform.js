import { dataUrl, dataTableId, dataResponseDataKey } from "../components/common";

const functionName = 'submitForm';
function template() {
    return `
        // 右侧内容查询开始
        var grids = $('[${dataTableId}]')
            .toArray()
            .map(function (element) {
                var id = $(element).attr('${dataTableId}');
                var key = $(element).attr('${dataResponseDataKey}');
                return {
                    gridOptions: window['gridOptions' + id],
                    key: key
                };
            })
        function ${functionName}(el, formId) {
            var valid = true;
            $('form.form-box').find('input[required], select[required], textarea[required]')
                .each(function () {
                    if (!this.value) {
                        valid = false;
                        layer.alert(this.name + '输入不能为空', {
                            icon: 2,
                            shadeClose: true,
                            title: '提示'
                        });
                        return false;
                    }
                });
            valid && $.ajax({
                url: config.fundodooApiDomainUrl + $(el).attr('${dataUrl}'),
                dataType: 'json',
                contentType: $('form.form-box').find('input[type=file]').length ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
                method : 'POST',
                async: true,
                traditional: true,
                data: (formId ? $('#formId') : $('form')).serializeJSON(),
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function (response, status, xhr) {
                    if (Array.isArray(response.data)) {
                        grids.length && grids[0].gridOptions.api.setRowData(response.data);
                    } else {
                        $.each(response.data, function (key, value) {
                            $.each(grids, function (i, grid) {
                                if (grid.key == key) {
                                    grid.gridOptions.api.setRowData(value);
                                    return false;
                                }
                            });
                        });
                    }
                }
            });
        }
    `;
}

export { template, functionName };