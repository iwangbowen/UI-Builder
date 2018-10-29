import { bootstrapautoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId, formControl } from '../common';
import _ from 'lodash';
import autoselectinput from './autoselectinput';

const bootstrapautoselectinput = _.extend({}, autoselectinput, {
    html: `<select ${dataAutoSelectId} ${dataComponentId}="${bootstrapautoselectinputid}" class="${formControl}">
           </select>`
});

export default bootstrapautoselectinput;