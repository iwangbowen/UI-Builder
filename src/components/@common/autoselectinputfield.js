import { dataComponentId, sortableClass, formItemClass } from '../common';
import { autoselectinputfieldid } from './ids';
import formlabel from './formlabel';
import autoselectinput from './autoselectinput';
import extend from 'lodash/extend';
import inputfield from './inputfield';

const autoselectinputfield = extend({}, inputfield, {
    name: "Auto Select Field",
    image: 'icons/select_input.svg',
    html: `<div style="display: flex;" class="${formItemClass} ${sortableClass}" ${dataComponentId}="${autoselectinputfieldid}">
               ${formlabel.html}
               ${autoselectinput.html}
           </div>`
});

export default autoselectinputfield;