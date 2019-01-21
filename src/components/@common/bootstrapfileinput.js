import fileinput from './fileinput';
import extend from 'lodash/extend';
import { dataComponentId, formControlFile, formControlSm, draggableComponent, defaultInputWidth } from '../common';
import { bootstrapfileinputid } from './ids';

const bootstrapfileinput = extend({}, fileinput, {
    html: `<input type="file" ${dataComponentId}="${bootstrapfileinputid}" class="${formControlSm} ${draggableComponent}" style="width: ${defaultInputWidth};">`
});

export default bootstrapfileinput;