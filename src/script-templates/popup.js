import { popupAdd, popupEdit, popupDelete, exportData, popupDetail } from '../util/popup-out-of-builder';
import { dataUrl, dataRelatedButton } from '../components/common';

export function template() {
    return `
${popupAdd.toString()}
${popupEdit.toString()}
${popupDelete.toString()}
${popupDetail.toString()}
${exportData.toString()}
function popupFormSubmitCallback() {
    submitForm($(this).parents('form'),
        $('button#' + $(this).parents('form').attr('${dataRelatedButton}')).attr('${dataUrl}'),
        function (response) {
            layer.closeAll();
            query();
        },
        function () {
        });
}
$('form.popup-form input[type=submit]').on('click', popupFormSubmitCallback);`;
}

export const popupScriptType = 'popup-script';