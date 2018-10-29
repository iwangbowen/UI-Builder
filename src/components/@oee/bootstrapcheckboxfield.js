import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstrapcheckboxfieldid } from './ids';
import checkboxfield from './checkboxfield';
import _ from 'lodash';
import bootstrapcheckbox from './bootstrapcheckbox';
import label from './label';

const bootstrapcheckboxfield = _.extend({}, checkboxfield, {
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstrapcheckboxfieldid}">
               ${label.html}
               ${bootstrapcheckbox.html}
           </div>`
});

export default bootstrapcheckboxfield;