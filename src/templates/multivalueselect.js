import { dataUrl } from '../util/dataAttr';

function template() {
    return `
    function processResults (res) {
        return {
            data: res.data.map(function (v) {
                return {
                    id: v.value,
                    text: v.text
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
                        $(self).select2(processResults(res));
                    }
                });
            } else {
                $(self).select2();
            }
        });
    });
    `;
}

export default template;