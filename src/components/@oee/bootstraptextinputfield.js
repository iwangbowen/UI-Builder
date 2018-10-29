import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstraptextinputfieldid } from './ids';
import bootstraptextinput from './bootstraptextinput';
import _ from 'lodash';
import textinputfield from './textinputfield';
import label from '../@general/label';

const bootstraptextinputfield = _.extend({}, textinputfield, {
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstraptextinputfieldid}">
            ${label.html}
            ${bootstraptextinput.html}
            <small class="form-text text-muted">We'll never share your email.</small>
           </div>`
});

export default bootstraptextinputfield;