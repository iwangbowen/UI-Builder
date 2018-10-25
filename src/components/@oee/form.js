import { formProperties as properties } from '../properties/form';
import { configurableComponent, dashBorderClass, dataComponentId } from '../common';
import { formid } from './ids';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: `<form class="${configurableComponent} ${dashBorderClass}" style="height: 50px; width: 100px;" ${dataComponentId}="${formid}">
           </form>`,
    afterDrop(node) {
        $(node).removeClass(dashBorderClass);
    },
    properties
};

export default form;