import { dataComponentId, sortableClass, formGroup, formText, textMuted, deletableComponent, rowClass, col_sm_9 } from '../common';
import { bootstraptextinputfieldid } from './ids';
import bootstraptextinput from './bootstraptextinput';
import extend from 'lodash/extend';
import textinputfield from './textinputfield';
import label from './label';

const bootstraptextinputfield = extend({}, textinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstraptextinputfieldid}">
            ${label.html}
            ${bootstraptextinput.html}
            <small class="${formText} ${textMuted} ${deletableComponent}">We'll never share your information.</small>
           </div>`
});

export default bootstraptextinputfield;