import FileManager from './gui/file-manager';
import {
    initPanelToggle, initBuilderPage, setGlobalVariables
} from './util/dom';
import { beBackwardCompatible } from './util/common';
import { isInIframe } from './constants';
import { initMessageListener } from './message';
import { initTopPanelDrag } from './util/interactions';

$(document).ready(function () {
    beBackwardCompatible();
    setGlobalVariables();
    if (isInIframe) {
        initMessageListener();
        $('#filemanager').hide();
        $('#components-list').css({
            height: '100%'
        });
    }
    FileManager.init();
    initBuilderPage();
    initPanelToggle();
    initTopPanelDrag();
});