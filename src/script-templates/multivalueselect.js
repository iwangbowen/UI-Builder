import { dataUrl, dataValueMapping, dataTextMapping } from "../components/common";

export function template() {
    return `
    function processResults (res, el) {
        var value = $(el).attr('${dataValueMapping}') || 'value';
        var text = $(el).attr('${dataTextMapping}') || 'text';
        return {
            data: res.data.map(function (v) {
                return {
                    id: v[value],
                    text: v[text]
                };
            })
        };
    }
    $(document).ready(function () {
        $('.js-example-basic-multiple').each(function () {
            var self = this;
            if ($(self).attr('${dataUrl}')) {
                $.ajax({
                    url: config.fundodooApiDomainUrl + $(self).attr('${dataUrl}'),
                    dataType: 'json',
                    success: function (res) {
                        $(self).select2(processResults(res, self));
                    }
                });
            } else {
                $(self).select2();
            }
        });
    });
    `;
}

export const multiValueSelectScriptType = 'multi-value-select-script';