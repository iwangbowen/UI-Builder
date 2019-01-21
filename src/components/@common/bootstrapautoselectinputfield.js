import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapautoselectinputfieldid } from './ids';
import extend from 'lodash/extend';
import autoselectinputfield from './autoselectinputfield';
import label from './label';
import bootstrapautoselectinput from './bootstrapautoselectinput';

const bootstrapautoselectinputfield = extend({}, autoselectinputfield, {
    html: `${label.html}${bootstrapautoselectinput.html}`
});

export default bootstrapautoselectinputfield;