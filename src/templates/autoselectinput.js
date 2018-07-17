import { dataUrl } from "../components/common";
import { autoselectinputSelector } from '../util/selectors';

function template() {
    return `
        function generateOptions(el, response) {
            response.forEach(function (option) {
                $('<option></option>')
                    .val(option.value)
                    .text(option.text)
                    .appendTo($(el));
            });
        }
        Array.from($('body').find('${autoselectinputSelector}'))
            .filter(function (el) {
                return $(el).attr('${dataUrl}');
            }).forEach(function (el) {
                $.ajax({
                    url: $(el).attr('${dataUrl}'),
                    success: function (response) {
                        generateOptions(el, response);
                    }
                });
            });
    `;
}

export default template;