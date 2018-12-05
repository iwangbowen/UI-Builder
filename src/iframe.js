import {
    setGlobalVariables, setTableDummyData, removeBaseTag, initTabs, initTooltip
} from './util/iframe-drag-n-drop';
import {
    initGridInBuilder
} from './util/grid';
import {
    addButtonListener
} from './util/iframe-listeners'

$(document).ready(() => {
    removeBaseTag();
    initTabs();
    initTooltip();
    setGlobalVariables();
    initGridInBuilder();
    setTableDummyData();
    addButtonListener();
});