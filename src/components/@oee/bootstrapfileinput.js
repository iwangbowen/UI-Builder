import fileinput from './fileinput';
import _ from 'lodash';
import { dataComponentId, formControlFile } from '../common';
import { bootstrapfileinputid } from './ids';

const bootstrapfileinput = _.extend({}, fileinput, {
    html: `<input type="file" ${dataComponentId}="${bootstrapfileinputid}" class="${formControlFile}">`
});

export default bootstrapfileinput;