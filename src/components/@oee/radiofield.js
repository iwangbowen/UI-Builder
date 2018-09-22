import { dataComponentId, formItemClass, sortableClass } from '../common';
import { radiofieldid } from './ids';
import _ from 'lodash';
import inputfield from './inputfield';
import formlabel from './formlabel';
import radio from './radio';

const radiofield = _.extend({}, inputfield, {
    name: "Radio Field",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${radiofieldid}">
            ${formlabel.html}
            ${radio.html}
           </div>`
});

export default radiofield;