import { bootstrapautoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId, formControl } from '../common';
import extend from 'lodash/extend';
import autoselectinput from './autoselectinput';

const bootstrapautoselectinput = extend({}, autoselectinput, {
    html: `<select ${dataAutoSelectId} ${dataComponentId}="${bootstrapautoselectinputid}" class="${formControl}">
           </select>`
});

export default bootstrapautoselectinput;