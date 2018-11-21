import { buttonClickedPopupPrefix, dataButtonKey, dataEnableButtonClickPopup } from "../components/common";

function template() {
    return `
    $('body').on('click', 'button', function () {
        if ($(this).attr('${dataEnableButtonClickPopup}') === 'true') {
            popupDetail(null, null, $('#' + '${buttonClickedPopupPrefix}' + $(this).attr('${dataButtonKey}')));
        }
    });
    `;
}

export default template;