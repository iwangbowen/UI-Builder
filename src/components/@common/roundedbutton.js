import { dataComponentId, cloneableComponent } from "../common";
import { roundedbuttonid } from './ids';
import { roundedButtonProperty as properties } from '../properties/button';

const roundedbutton = {
    classes: ["btn", "btn-link", 'btn@common'],
    nodes: ['button'],
    name: "Rounded Button",
    image: "icons/button.svg",
    sortable: true,
    html: `<button ${dataComponentId}=${roundedbuttonid} type="button" class="btn btn-primary btn-sm btn-circle ${cloneableComponent}">
            <i class="fa fa-check"></i>
           </button>`,
    properties
};

export default roundedbutton;