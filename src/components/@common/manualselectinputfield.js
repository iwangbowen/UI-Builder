import { dataComponentId, sortableClass, formItemClass } from '../common';
import { manualselectinputfieldid } from './ids';
import formlabel from './formlabel';
import _ from 'lodash';
import inputfield from './inputfield';
import manualselectinput from './manualselectinput';

const manualselectinputfield = _.extend({}, inputfield, {
    name: "Munual Select Field",
    image: "icons/select_input.svg",
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${manualselectinputfieldid}">
               ${formlabel.html}
               ${manualselectinput.html}
           </div>`
});

export default manualselectinputfield;