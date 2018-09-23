import {
    initDropzone, initResizeDrag, initDraggable, setGlobalVariables
} from './util/iframe-drag-n-drop';

$(document).ready(() => {
    setGlobalVariables();
    initDropzone();
    initResizeDrag();
    initDraggable();
});