import { dataUrl, dataValueMapping, dataTextMapping } from "../components/common";
import { autoselectinputSelector } from '../util/selectors';

export function template() {
    return `
        function generateOptions(el, response) {
            var value = $(el).attr('${dataValueMapping}') || 'value';
            var text = $(el).attr('${dataTextMapping}') || 'text';
            response.forEach(function (option) {
                $('<option></option>')
                    .val(option[value])
                    .text(option[text])
                    .appendTo($(el));
            });
        }
        [].slice.call($('body').find('${autoselectinputSelector}'))
            .filter(function (el) {
                return $(el).attr('${dataUrl}');
            }).forEach(function (el) {
                var data = {
                    owner: 'Common',
                    queryId: 'findIdType',
                    version: '10001',
                    paramSource: null
                };
                $.ajax({
                    url: config.fundodooApiDomainUrl + $(el).attr('${dataUrl}'),
                    dataType: 'json',
                    method: 'POST',
                    data: data,
                    async: true,
                    success: function (response) {
                        generateOptions(el, response.data);
                    }
                });
            });
    `;
}

export const autoSelectInputScriptType = 'auto-select-input-script';