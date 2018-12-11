import { formProperties as properties } from '../properties/form';
import { configurableComponent, dashBorderClass, dataComponentId } from '../common';
import { formid } from './ids';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    dragHtml: `<img ${dataComponentId}="${formid}" src="libs/builder/icons/form.svg" style="width: 100px; height: auto;">`,
    html: `<form class="${configurableComponent}" ${dataComponentId}="${formid}">
           </form>`,
    getDropHtml() {
        return this.html;
    },
    properties
};

export default form;