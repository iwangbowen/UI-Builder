import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapautoselectinputfieldid } from './ids';
import extend from 'lodash/extend';
import autoselectinputfield from './autoselectinputfield';
import label from './label';
import bootstrapautoselectinput from './bootstrapautoselectinput';

const bootstrapautoselectinputfield = extend({}, autoselectinputfield, {
    html: `<div class="${sortableClass} ${formGroup} ${rowClass}" ${dataComponentId}="${bootstrapautoselectinputfieldid}">
               ${label.html}
               <div class="${col_sm_9}">
                ${bootstrapautoselectinput.html}
               </div>
           </div>`
});

export default bootstrapautoselectinputfield;