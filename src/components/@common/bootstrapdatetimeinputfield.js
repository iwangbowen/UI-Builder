import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapdatetimeinputfieldid } from './ids';
import extend from 'lodash/extend';
import label from './label';
import datetimeinputfield from './datetimeinputfield';
import bootstrapdatetimeinput from './bootstrapdatetimeinput';

const bootstrapdatetimeinputfield = extend({}, datetimeinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapdatetimeinputfieldid}">
               ${label.html}
               ${bootstrapdatetimeinput.html}
           </div>`
});

export default bootstrapdatetimeinputfield;