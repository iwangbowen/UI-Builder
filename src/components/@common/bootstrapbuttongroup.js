import { buttonGroupProperties as properties } from '../properties/button';
import button from './button';
import _ from 'lodash';
import basiccomponent from './basiccomponent';

const bootstrapbuttongroup = _.extend({}, basiccomponent, {
    classes: ["btn-group"],
    name: "Button Group",
    image: "icons/button_group.svg",
    html: `<div class="btn-group" role="group" aria-label="Basic example">
                ${button.html}
                ${button.html}
                ${button.html}
           </div>`,
    properties
});

export default bootstrapbuttongroup;