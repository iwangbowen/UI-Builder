import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstraptextinputfieldid } from './ids';
import bootstraptextinput from './bootstraptextinput';
import _ from 'lodash';
import inputfield from './inputfield';
import label from '../@general/label';

const bootstraptextinputfield = _.extend({}, inputfield, {
    name: "Text Input Field",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstraptextinputfieldid}">
            ${label.html}
            ${bootstraptextinput.html}
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
           </div>`
});

export default bootstraptextinputfield;