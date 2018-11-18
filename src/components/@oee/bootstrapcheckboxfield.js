import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import { bootstrapcheckboxfieldid } from './ids';
import checkboxfield from './checkboxfield';
import _ from 'lodash';
import bootstrapcheckbox from './bootstrapcheckbox';
import label from './label';

const bootstrapcheckboxfield = _.extend({}, checkboxfield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapcheckboxfieldid}">
               ${label.html}
               <div class="${col_sm_10}">
                ${bootstrapcheckbox.html}
               </div>
           </div>`
});

export default bootstrapcheckboxfield;