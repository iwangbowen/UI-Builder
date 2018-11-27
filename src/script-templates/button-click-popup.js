import { buttonClickedPopupPrefix, dataButtonKey, dataEnableButtonClickPopup } from "../components/common";

export function template() {
    return `
    $('body').on('click', 'button', function () {
        if ($(this).attr('${dataEnableButtonClickPopup}') === 'true') {
            popupDetail(null, null, $('#' + '${buttonClickedPopupPrefix}' + $(this).attr('${dataButtonKey}')));
        }
    });
    `;
}

export const buttonClickPopupScriptType = 'button-click-popup-script';