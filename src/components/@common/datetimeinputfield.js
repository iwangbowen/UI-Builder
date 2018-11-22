import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass, formItemClass } from '../common';
import { datetimeinputfieldid } from './ids';
import formlabel from './formlabel';
import datetimeinput from './datetimeinput';
import extend from 'lodash/extend';
import inputfield from './inputfield';

const datetimeinputfield = extend({}, inputfield, {
    name: "Datetime Input Field",
    attributes: { "type": inputTypeNames },
    image: "icons/calendar.svg",
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${datetimeinputfieldid}">
               ${formlabel.html}
               ${datetimeinput.html}
           </div>`
});

export default datetimeinputfield;