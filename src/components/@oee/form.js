import { formProperties as properties } from '../properties/form';
import { configurableComponent, dashBorderClass, dataComponentId } from '../common';
import { formid } from './ids';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: `<div ${dataComponentId}="${formid}" style="height: 50px; width: 100px;" class="${dashBorderClass}">
            <form class="${configurableComponent}" style="height: 100%;">
            </form>
           </div>`,
    afterDrop(node) {
        $(node).removeClass(dashBorderClass);
    },
    properties
};

export default form;