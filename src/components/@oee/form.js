import { formProperties as properties } from '../properties/form';
import { configurableComponent, formBorderClass } from '../common';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: `<form class="${configurableComponent} ${formBorderClass}" style="width: 100px; height: 50px;">
           </form>`,
    afterDrop(node) {
        $(node).removeClass(formBorderClass);
    },
    properties
};

export default form;