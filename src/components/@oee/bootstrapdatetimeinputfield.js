import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import { bootstrapdatetimeinputfieldid } from './ids';
import _ from 'lodash';
import label from './label';
import datetimeinputfield from './datetimeinputfield';
import bootstrapdatetimeinput from './bootstrapdatetimeinput';

const bootstrapdatetimeinputfield = _.extend({}, datetimeinputfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapdatetimeinputfieldid}">
               ${label.html}
               <div class="${col_sm_10}">
                ${bootstrapdatetimeinput.html}
               </div>
           </div>`
});

export default bootstrapdatetimeinputfield;