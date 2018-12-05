import { buttonClickedPopupPrefix, dataButtonKey, dataEnableButtonClickPopup } from "../components/common";

export function template() {
    return `
function buttonClickedPopupCallback() {
    if ($(this).attr('${dataEnableButtonClickPopup}') === 'true') {
        popupDetail(null, null, $('#' + '${buttonClickedPopupPrefix}' + $(this).attr('${dataButtonKey}')));
    }
}
$('body').on('click', 'button', buttonClickedPopupCallback);`;
}

export const buttonClickPopupScriptType = 'button-click-popup-script';