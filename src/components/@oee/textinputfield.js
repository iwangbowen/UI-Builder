import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass } from '../common';
import input from './input';
import { textinputfieldid } from './ids';
import textinput from './textinput';
import formlabel from './formlabel';
import _ from 'lodash';

const textinputfield = _.extend({}, input, {
    name: "Text Input Field",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    sortable: true,
    html: `<div class="form-item ${sortableClass}" ${dataComponentId}="${textinputfieldid}">
               ${formlabel.html}
               ${textinput.html}
           </div>`
});

export default textinputfield;