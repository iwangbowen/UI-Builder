import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapradiofieldid } from './ids';
import extend from 'lodash/extend';
import label from './label';
import radiofield from './radiofield';
import bootstrapradio from './bootstrapradio';

const bootstrapradiofield = extend({}, radiofield, {
    html: `${label.html}${bootstrapradio.html}`
});

export default bootstrapradiofield;