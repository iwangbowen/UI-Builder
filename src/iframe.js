import {
    initDropzone, setGlobalVariables
} from './util/iframe-drag-n-drop';

$(document).ready(() => {
    setGlobalVariables();
    initDropzone();
});