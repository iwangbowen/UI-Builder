import { dataUrl, dataValueMapping, dataTextMapping } from "../components/common";
import { autoselectinputSelector } from '../util/selectors';

function template() {
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
        Array.from($('body').find('${autoselectinputSelector}'))
            .filter(function (el) {
                return $(el).attr('${dataUrl}');
            }).forEach(function (el) {
                $.ajax({
                    url: config.fundodooApiDomainUrl + $(el).attr('${dataUrl}'),
                    success: function (response) {
                        if (response.code == 200) {
                            generateOptions(el, response.data);
                        }
                    }
                });
            });
    `;
}

export default template;