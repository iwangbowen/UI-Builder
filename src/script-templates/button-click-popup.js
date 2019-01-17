import { buttonClickedPopupPrefix, dataButtonKey, dataEnableButtonClickPopup } from "../components/common";

export function template() {
    return `
function popupDetail(url, data, popup) {
    // Compatible with previous only one detail popup window
    var content = popup && popup.length ? popup : $('div.popup-window#detail');
    var openPopup = function () {
        layer.open({
            type: 1,
            title: '信息',
            area: ['660px', '330px'],
            skin: 'layui-layer-rim', //加上边框
            content: content,
            end: function () {
            }
        });
    };
    openPopup();
}
function buttonClickedPopupCallback() {
    if ($(this).attr('${dataEnableButtonClickPopup}') === 'true') {
        popupDetail(null, null, $('#' + '${buttonClickedPopupPrefix}' + $(this).attr('${dataButtonKey}')));
    }
}
$('body').on('click', 'button', buttonClickedPopupCallback);`;
}

export const buttonClickPopupScriptType = 'button-click-popup-script';