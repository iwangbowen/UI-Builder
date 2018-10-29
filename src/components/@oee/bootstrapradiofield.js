import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstrapradiofieldid } from './ids';
import _ from 'lodash';
import label from './label';
import radiofield from './radiofield';
import bootstrapradio from './bootstrapradio';

const bootstrapradiofield = _.extend({}, radiofield, {
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstrapradiofieldid}">
            ${label.html}
            ${bootstrapradio.html}
           </div>`
});

export default bootstrapradiofield;