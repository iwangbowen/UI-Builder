import { dataTableId } from "../components/common";

const functionName = 'submitForm';
function template() {
    return `
        var gridOptionsIdentifier = window['gridOptions' + $('[${dataTableId}]').attr('${dataTableId}')];
        function ${functionName}(element, formId) {
            $.ajax({
                // url: config.fundodooWebDomainUrl + $(element).attr('data-url'),
                url: 'http://localhost:8080/api/data',
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