import fileinput from './fileinput';
import extend from 'lodash/extend';
import { dataComponentId, formControlFile, formControlSm } from '../common';
import { bootstrapfileinputid } from './ids';

const bootstrapfileinput = extend({}, fileinput, {
    html: `<input type="file" ${dataComponentId}="${bootstrapfileinputid}" class="${formControlFile} ${formControlSm}">`
});

export default bootstrapfileinput;