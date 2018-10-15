import textinputfield from './textinputfield';
import { formProperties as properties } from '../form';
import { configurableComponent } from '../common';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: `<form class="${configurableComponent}">
            ${textinputfield.html}
            ${textinputfield.html}
           </form>`,
    properties
};

export default form;