import {
    dataComponentId, configurableComponent, solidBorder, draggableComponent,
    droppableComponent, resizableComponent, defaultSizeStyle, scaleOnResizeComponent
} from '../common';
import { bootstrapcontainerid } from './ids';
import { containerProperties as properties } from '../properties/container';

const bootstrapcontainer = {
    classes: ["container", "container-fluid"],
    image: "icons/container.svg",
    dragHtml: `<img ${dataComponentId}="${bootstrapcontainerid}" src="libs/builder/icons/container.svg" style="width: 75px; height: auto;">`,
    html: `<div style="${defaultSizeStyle}" class="container-fluid ${solidBorder} ${configurableComponent} ${draggableComponent} ${scaleOnResizeComponent} ${droppableComponent} ${resizableComponent}" ${dataComponentId}="${bootstrapcontainerid}"></div>`,
    sortable: false,
    droppable: true,
    getDropHtml() {
        return this.html;
    },
    height: '150px',
    name: "Container",
    properties
};

export default bootstrapcontainer;