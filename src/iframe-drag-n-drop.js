import {
    arrowKeyMove, initDropzone, initResizeDrag, initDraggable
} from './util/iframe-drag-n-drop-util';
import { addData, editData, deleteData, getAddContent, getEditContent } from './layer';

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
    initDraggable();
});