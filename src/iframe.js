import {
    setGlobalVariables, setTableDummyData, removeBaseTag, initTabs, initTooltip, initAlignmentLines
} from './util/iframe-drag-n-drop';
import {
    addButtonListener
} from './util/iframe-listeners'

$(document).ready(() => {
    removeBaseTag();
    initTabs();
    initTooltip();
    setGlobalVariables();
    setTableDummyData();
    addButtonListener();
    initAlignmentLines();
});