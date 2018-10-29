import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstrapmanualselectinputfieldid } from './ids';
import label from './label';
import _ from 'lodash';
import bootstrapmanualselectinput from './bootstrapmanualselectinput';
import manualselectinputfield from './manualselectinputfield';

const bootstrapmanualselectinputfield = _.extend({}, manualselectinputfield, {
    name: "Munual Select Field",
    image: "icons/select_input.svg",
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstrapmanualselectinputfieldid}">
               ${label.html}
               ${bootstrapmanualselectinput.html}
           </div>`
});

export default bootstrapmanualselectinputfield;