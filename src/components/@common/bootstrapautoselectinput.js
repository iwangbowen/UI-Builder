import { bootstrapautoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId, formControl, formControlSm } from '../common';
import extend from 'lodash/extend';
import autoselectinput from './autoselectinput';

const bootstrapautoselectinput = extend({}, autoselectinput, {
    html: `<select ${dataAutoSelectId} ${dataComponentId}="${bootstrapautoselectinputid}" class="${formControl} ${formControlSm}">
           </select>`
});

export default bootstrapautoselectinput;