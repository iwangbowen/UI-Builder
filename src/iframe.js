import {
    setGlobalVariables, setTableDummyData
} from './util/iframe-drag-n-drop';
import {
    initGridInBuilder
} from './util/grid';
import {
    addButtonListener
} from './util/iframe-listeners'

$(document).ready(() => {
    setGlobalVariables();
    initGridInBuilder();
    setTableDummyData();
    addButtonListener();
});