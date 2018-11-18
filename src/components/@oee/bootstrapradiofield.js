import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import { bootstrapradiofieldid } from './ids';
import _ from 'lodash';
import label from './label';
import radiofield from './radiofield';
import bootstrapradio from './bootstrapradio';

const bootstrapradiofield = _.extend({}, radiofield, {
    html: `<div class="${formGroup} ${sortableClass} ${rowClass}" ${dataComponentId}="${bootstrapradiofieldid}">
            ${label.html}
            <div class="${col_sm_10}">
                ${bootstrapradio.html}
            </div>
           </div>`
});

export default bootstrapradiofield;