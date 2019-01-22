import { dataComponentId, formControl, formControlSm, draggableComponent, resizableComponent, defaultInputWidth } from '../common';
import textinput from './textinput';
import { bootstraptextinputid } from './ids';
import extend from 'lodash/extend';

const bootstraptextinput = extend({}, textinput, {
    html: `<input ${dataComponentId}="${bootstraptextinputid}" type="text" class="${formControl} ${formControlSm} ${draggableComponent}" style="width: ${defaultInputWidth}">`
});

export default bootstraptextinput;