import {
    setGlobalVariables, setTableDummyData, removeBaseTag
} from './util/iframe-drag-n-drop';
import {
    initGridInBuilder
} from './util/grid';
import {
    addButtonListener
} from './util/iframe-listeners'

$(document).ready(() => {
    removeBaseTag();
    $('#tabs').tabs()
    setGlobalVariables();
    initGridInBuilder();
    setTableDummyData();
    addButtonListener();
});