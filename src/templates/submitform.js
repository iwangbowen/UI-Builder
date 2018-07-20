import { dataTableId } from "../components/common";

const functionName = 'submitForm';
function template() {
    return `
        // 右侧内容查询开始
        var gridOptionsIdentifier = window['gridOptions' + $('[${dataTableId}]').attr('${dataTableId}')];
        function ${functionName}(el, formId) {
            $.ajax({
                url: config.fundodooApiDomainUrl + $(el).attr('data-url'),
                dataType: 'json',
                method : 'POST',
                async: true,
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