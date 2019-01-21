import { dataComponentId, sortableClass, formGroup, formText, textMuted, deletableComponent, rowClass, col_sm_9, draggableComponent } from '../common';
import { bootstraptextinputfieldid } from './ids';
import bootstraptextinput from './bootstraptextinput';
import extend from 'lodash/extend';
import textinputfield from './textinputfield';
import label from './label';

const bootstraptextinputfield = extend({}, textinputfield, {
    html: `${label.html}${bootstraptextinput.html}`
});

export default bootstraptextinputfield;