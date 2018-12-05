import {
    dataEnableButtonClickPopup, buttonClickedPopupPrefix, dataButtonKey
} from "../components/common";
import { popupDetail } from "./popup-in-builder";

function addButtonListener() {
    $('body').on('click', 'button', function () {
        if ($(this).attr(dataEnableButtonClickPopup) === 'true') {
            popupDetail($(`#${buttonClickedPopupPrefix}${$(this).attr(dataButtonKey)}`));
        }
    });
}

export {
    addButtonListener
};