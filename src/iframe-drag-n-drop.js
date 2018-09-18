import {
    arrowKeyMove, initDropzone, initResizeDrag, initDraggable, initResizeVetically
} from './util/iframe-drag-n-drop-util';
import { addData, editData, getAddContent, getEditContent } from './layer';
import { add, edit, batchDelete } from './util/popup';

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
    self.getAddContent = getAddContent;
    self.getEditContent = getEditContent;
    self.add = add;
    self.edit = edit;
    self.batchDelete = batchDelete;

    initDropzone();
    initResizeDrag();
    initResizeVetically();
    initDraggable();
});