import {
    setGlobalVariables, setTableDummyData, removeBaseTag, initTabs
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
    setGlobalVariables();
    initGridInBuilder();
    setTableDummyData();
    addButtonListener();
});