import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstrapautoselectinputfieldid } from './ids';
import _ from 'lodash';
import autoselectinputfield from './autoselectinputfield';
import label from './label';
import bootstrapautoselectinput from './bootstrapautoselectinput';

const bootstrapautoselectinputfield = _.extend({}, autoselectinputfield, {
    html: `<div class="${sortableClass} ${formGroup}" ${dataComponentId}="${bootstrapautoselectinputfieldid}">
               ${label.html}
               ${bootstrapautoselectinput.html}
           </div>`
});

export default bootstrapautoselectinputfield;