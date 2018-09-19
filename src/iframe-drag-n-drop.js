import {
    initDropzone, initResizeDrag, initDraggable, setGlobalVariables
} from './util/iframe-drag-n-drop-util';

/**
 * TODO:
 * - Implement element drag inside iframe
 * - Use jQuery-ui instead of interact.js
 * - Remove code inside iframe to parent page
 */
$(document).ready(() => {
    setGlobalVariables();
    initDropzone();
    initResizeDrag();
    initDraggable();
});