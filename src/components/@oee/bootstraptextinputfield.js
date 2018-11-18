import { dataComponentId, sortableClass, formGroup, formText, textMuted, deletableComponent, rowClass, col_sm_10 } from '../common';
import { bootstraptextinputfieldid } from './ids';
import bootstraptextinput from './bootstraptextinput';
import _ from 'lodash';
import textinputfield from './textinputfield';
import label from './label';

const bootstraptextinputfield = _.extend({}, textinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstraptextinputfieldid}">
            ${label.html}
            <div class="${col_sm_10}">
                ${bootstraptextinput.html}
                <small class="${formText} ${textMuted} ${deletableComponent}">We'll never share your information.</small>
            </div>
           </div>`
});

export default bootstraptextinputfield;