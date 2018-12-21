import { dataComponentId, sortableClass, formItemClass } from '../common';
import formlabel from './formlabel';
import extend from 'lodash/extend';
import inputfield from './inputfield';
import multiselectinput from './multivalueselectinput';
import { multivalueselectinputfieldid } from './ids';

const multiselectinputfield = extend({}, inputfield, {
    name: "Multi-value Select Field",
    image: 'icons/select_input.svg',
    html: `<div style="display: flex;" class="${formItemClass} ${sortableClass}" ${dataComponentId}="${multivalueselectinputfieldid}">
               ${formlabel.html}
               ${multiselectinput.html}
           </div>`
});

export default multiselectinputfield;