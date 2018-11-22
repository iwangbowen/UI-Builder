import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import label from './label';
import { bootstrapfileinputfieldid } from './ids';
import extend from 'lodash/extend';
import bootstrapfileinput from './bootstrapfileinput';
import fileinputfield from './fileinputfield';

const bootstrapfileinputfield = extend({}, fileinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapfileinputfieldid}">
            ${label.html}
            <div class="${col_sm_9}">
			    ${bootstrapfileinput.html}
            </div>
           </div>`
});

export default bootstrapfileinputfield;