import { popupAdd, popupEdit, popupDelete, exportData, popupDetail } from '../util/popup';
import { dataUrl, dataRelatedButton } from '../components/common';

function template() {
    return `
        var isInBuilder = false;
        ${popupAdd.toString()}
        ${popupEdit.toString()}
        ${popupDelete.toString()}
        ${popupDetail.toString()}
        ${exportData.toString()}
        $('form.popup-form input[type=submit]').click(function () {
            submitForm($(this).parents('form'),
                $('button#' + $(this).parents('form').attr('${dataRelatedButton}')).attr('${dataUrl}'),
                function (response) {
                    layer.closeAll();
                    query();
                },
                function () {
                });
        });
    `;
}

export default template;