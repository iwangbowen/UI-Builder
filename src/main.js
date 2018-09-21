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

$(document).ready(function () {
    initTopPanelDrag();
    initPanelToggle();
    setGlobalVariables();
    Vvveb.FileManager.init();
    initBuilderPage();
});