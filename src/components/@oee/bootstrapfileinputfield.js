import { dataComponentId, sortableClass, formGroup } from '../common';
import label from './label';
import { bootstrapfileinputfieldid } from './ids';
import _ from 'lodash';
import bootstrapfileinput from './bootstrapfileinput';
import fileinputfield from './fileinputfield';

const bootstrapfileinputfield = _.extend({}, fileinputfield, {
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstrapfileinputfieldid}">
            ${label.html}
			${bootstrapfileinput.html}
           </div>`
});

export default bootstrapfileinputfield;