import { dataComponentId, sortableClass, formItemClass } from '../common';
import { checkboxfieldid } from './ids';
import formlabel from './formlabel';
import checkbox from './checkbox';
import extend from 'lodash/extend';
import inputfield from './inputfield';

const checkboxfield = extend({}, inputfield, {
    name: "Checkbox Field",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${checkboxfieldid}">
               ${formlabel.html}
               ${checkbox.html}
           </div>`
});

export default checkboxfield;