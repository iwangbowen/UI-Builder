import Vvveb from './gui/components';
import './gui/builder';
import './gui/wysiwyg-editor';
import './gui/actions';
import './gui/file-manager';
import './gui/undo';
import './gui/plugin-codemirror';
import './components-loader';
import {
    initPanelToggle, initBuilderPage, setGlobalVariables
} from './util/dom';
import { initTopPanelDrag } from './util/drag-n-drop';
import { beBackwardCompatible } from './util/common';

/**
 * TODO:
 * 1. Use connect list to drag elements from component group
 * and make them sortable.
 */
$(document).ready(function () {
    beBackwardCompatible();
    initPanelToggle();
    setGlobalVariables();
    Vvveb.FileManager.init();
    initBuilderPage();
});