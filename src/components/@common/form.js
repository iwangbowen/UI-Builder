import { formProperties as properties } from '../properties/form';
import { configurableComponent, dataComponentId, placeholderComponentHighlight, dashedBorder, draggableComponent, resizableComponent, scaleOnResizeComponent, droppableComponent, form_inline } from '../common';
import { formid } from './ids';

const form = {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    dragHtml: `<img ${dataComponentId}="${formid}" src="libs/builder/icons/form.svg" style="width: 100px; height: auto;">`,
    html: `<form style="width: 500px; height: 200px;" class="${form_inline} ${dashedBorder} ${configurableComponent} ${draggableComponent} ${droppableComponent} ${resizableComponent} ${scaleOnResizeComponent}" ${dataComponentId}="${formid}">
           </form>`,
    getDropHtml() {
        return this.html;
    },
    properties
};

export default form;