import { dataComponentId, sortableClass, formItemClass } from '../common';
import formlabel from './formlabel';
import _ from 'lodash';
import inputfield from './inputfield';
import multiselectinput from './multivalueselectinput';
import { multivalueselectinputfieldid } from './ids';

const multiselectinputfield = _.extend({}, inputfield, {
    name: "Multi-value Select Field",
    image: 'icons/select_input.svg',
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${multivalueselectinputfieldid}">
               ${formlabel.html}
               ${multiselectinput.html}
           </div>`
});

export default multiselectinputfield;