import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import label from './label';
import { bootstrapfileinputfieldid } from './ids';
import _ from 'lodash';
import bootstrapfileinput from './bootstrapfileinput';
import fileinputfield from './fileinputfield';

const bootstrapfileinputfield = _.extend({}, fileinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapfileinputfieldid}">
            ${label.html}
            <div class="${col_sm_10}">
			    ${bootstrapfileinput.html}
            </div>
           </div>`
});

export default bootstrapfileinputfield;