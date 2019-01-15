import {
    dataEnableButtonClickPopup, buttonClickedPopupPrefix, dataButtonKey
} from "../components/common";
import { popupCommon } from "./popup-in-builder";

function addButtonListener() {
    $('body').on('click', 'button', function () {
        if ($(this).attr(dataEnableButtonClickPopup) === 'true') {
            popupCommon($(`#${buttonClickedPopupPrefix}${$(this).attr(dataButtonKey)}`));
        }
    });
}

export {
    addButtonListener
};