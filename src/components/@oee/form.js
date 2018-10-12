import textinputfield from './textinputfield';
import { formProperties as properties } from '../form';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: `<form class="dropzone">
            ${textinputfield.html}
            ${textinputfield.html}
           </form>`,
    properties
};

export default form;