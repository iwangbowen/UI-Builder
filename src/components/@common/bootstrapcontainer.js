import { dataComponentId, configurableComponent, placeholderComponentHighlight } from '../common';
import { bootstrapcontainerid } from './ids';
import { containerProperties as properties } from '../properties/container';

const bootstrapcontainer = {
    classes: ["container", "container-fluid"],
    image: "icons/container.svg",
    dragHtml: `<img ${dataComponentId}="${bootstrapcontainerid}" src="libs/builder/icons/container.svg" style="width: 100px; height: auto;">`,
    html: `<div class="container-fluid ${placeholderComponentHighlight} ${configurableComponent}" ${dataComponentId}="${bootstrapcontainerid}"></div>`,
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