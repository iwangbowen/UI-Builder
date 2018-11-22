import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapradiofieldid } from './ids';
import extend from 'lodash/extend';
import label from './label';
import radiofield from './radiofield';
import bootstrapradio from './bootstrapradio';

const bootstrapradiofield = extend({}, radiofield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapradiofieldid}">
            ${label.html}
            <div class="${col_sm_9}">
                ${bootstrapradio.html}
            </div>
           </div>`
});

export default bootstrapradiofield;