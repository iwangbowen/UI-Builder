import { dataComponentId, cloneableComponent } from "../common";
import { buttonid } from './ids';
import { buttonProperties as properties } from '../properties/button';

const button = {
    classes: ["btn", "btn-link", 'btn@common'],
    nodes: ['button'],
    name: "Button",
    image: "icons/button.svg",
    sortable: true,
    html: `<button ${dataComponentId}=${buttonid} type="button" class="btn btn-primary ${cloneableComponent}">Search</button>`,
    properties
};

export default button;