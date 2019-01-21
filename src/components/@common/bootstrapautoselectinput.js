import { bootstrapautoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId, formControl, formControlSm, draggableComponent, defaultInputWidth } from '../common';
import extend from 'lodash/extend';
import autoselectinput from './autoselectinput';

const bootstrapautoselectinput = extend({}, autoselectinput, {
    html: `<select ${dataAutoSelectId} ${dataComponentId}="${bootstrapautoselectinputid}" class="${formControl} ${formControlSm} ${draggableComponent}" style="width: ${defaultInputWidth};">
           </select>`
});

export default bootstrapautoselectinput;