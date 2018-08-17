import { dataUrl, dataTableId } from "../components/common";

const functionName = 'submitForm';
function template() {
    return `
        // 右侧内容查询开始
        var gridOptionsIdentifier = window['gridOptions' + $('[${dataTableId}]').attr('${dataTableId}')];
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
                method : 'POST',
                async: true,
                traditional: true,
                data: (formId ? $('#formId') : $('form')).serializeJSON(),
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function (response, status, xhr) {
                    gridOptionsIdentifier.api.setRowData(response.data);
                }
            });
        }
    `;
}

export { template, functionName };