import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import { bootstrapautoselectinputfieldid } from './ids';
import _ from 'lodash';
import autoselectinputfield from './autoselectinputfield';
import label from './label';
import bootstrapautoselectinput from './bootstrapautoselectinput';

const bootstrapautoselectinputfield = _.extend({}, autoselectinputfield, {
    html: `<div class="${sortableClass} ${formGroup} ${rowClass}" ${dataComponentId}="${bootstrapautoselectinputfieldid}">
               ${label.html}
               <div class="${col_sm_10}">
                ${bootstrapautoselectinput.html}
               </div>
           </div>`
});

export default bootstrapautoselectinputfield;