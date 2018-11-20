import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass, formItemClass } from '../common';
import { textinputfieldid } from './ids';
import textinput from './textinput';
import formlabel from './formlabel';
import _ from 'lodash';
import inputfield from './inputfield';

const textinputfield = _.extend({}, inputfield, {
    name: "Text Input Field",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${textinputfieldid}">
               ${formlabel.html}
               ${textinput.html}
           </div>`
});

export default textinputfield;