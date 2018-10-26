import {
    setGlobalVariables
} from './util/iframe-drag-n-drop';
import {
    initGridInBuilder
} from './util/grid';

$(document).ready(() => {
    setGlobalVariables();
    initGridInBuilder();
});