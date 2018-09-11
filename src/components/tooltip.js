import { dataTitle } from './common';
import { TextInput } from '../inputs/inputs';

const options = {
    position: {
        my: "left top",
        at: "right+5 top-5",
        collision: "none"
    }
};

function init(element) {
    return document.getElementById('iframeId').contentWindow.$(element).attr(dataTitle);
}

function afterChange(element, value, input, component) {
    document.getElementById('iframeId').contentWindow.$(element)
        .attr(dataTitle, value)
        .tooltip(options);
}

const property = {
    name: 'Title',
    key: 'title',
    htmlAttr: 'title',
    inputtype: new TextInput(),
    init,
    afterChange
};

export {
    property,
    options
};