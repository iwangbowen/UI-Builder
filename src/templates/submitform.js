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