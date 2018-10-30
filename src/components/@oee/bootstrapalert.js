import { alertProperties as properties } from '../properties/alert';
import { dataComponentId, configurableComponent } from '../common';
import { bootstrapalertid } from './ids';

const bootstrapalert = {
    classes: ["alert"],
    name: "Alert",
    image: "icons/alert.svg",
    sortable: true,
    html: `<div ${dataComponentId}="${bootstrapalertid}" class="${configurableComponent} alert alert-warning alert-dismissible fade show" role="alert">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		  <strong>Warning!</strong> <span>You should have a double check.<span>
		</div>`,
    properties
};

export default bootstrapalert;