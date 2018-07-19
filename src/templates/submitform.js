import { dataTableId } from "../components/common";

const functionName = 'submitForm';
function template() {
    return `
        var gridOptionsIdentifier = window['gridOptions' + $('[${dataTableId}]').attr('${dataTableId}')];
        function ${functionName}(el, formId) {
            $.ajax({
                url: config.fundodooWebDomainUrl + $(el).attr('data-url'),
                dataType: 'json',
                method : 'POST',
                data: (formId ? $('#formId') : $('form')).serializeJSON(),
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function (rs, status, xhr) {
                    if (rs.code == 200) {
                        gridOptionsIdentifier.api.setRowData(rs.data);
                    }
                }
            });
        }
    `;
}

export { template, functionName };