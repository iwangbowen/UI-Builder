import Vvveb from './gui/components';
import './gui/builder';
import './gui/wysiwyg-editor';
import './gui/actions';
import './gui/file-manager';
import './gui/undo';
import './components-loader';
import {
    initPanelToggle, initBuilderPage, setGlobalVariables
} from './util/dom';
import { beBackwardCompatible } from './util/common';
import { isInIframe } from './constants';
import { initMessageListener } from './message';
import { initTopPanelDrag } from './util/drag-n-drop';

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
    Vvveb.FileManager.init();
    initBuilderPage();
    initPanelToggle();
    initTopPanelDrag();
});