import {
    arrowKeyMove, initDropzone, initResizeDrag, initDraggable, initResizeVetically
} from './util/iframe-drag-n-drop-util';
import { addData, editData, deleteData, getAddContent, getEditContent } from './layer';

/**
 * TODO:
 * - Implement element drag inside iframe
 * - Use jQuery-ui instead of interact.js
 * - Remove code inside iframe to parent page
 */
$(document).ready(() => {
    self.interact = interact;
    self.arrowKeyMove = arrowKeyMove;
    self.addData = addData;
    self.editData = editData;
    self.deleteData = deleteData;
    self.getAddContent = getAddContent;
    self.getEditContent = getEditContent;

    initDropzone();
    initResizeDrag();
    initResizeVetically();
    initDraggable();
});