import { dataTitle } from './common';
import { TextInput } from '../inputs/inputs';
import { tooltipOptions } from '../common';

function init(element) {
    return document.getElementById('iframeId').contentWindow.$(element).attr(dataTitle);
}

function afterChange(element, value, input, component) {
    document.getElementById('iframeId').contentWindow.$(element)
        .attr(dataTitle, value)
        .tooltip(tooltipOptions);
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
    tooltipOptions
};