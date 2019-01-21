import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import { bootstrapdatetimeinputfieldid } from './ids';
import extend from 'lodash/extend';
import label from './label';
import datetimeinputfield from './datetimeinputfield';
import bootstrapdatetimeinput from './bootstrapdatetimeinput';

const bootstrapdatetimeinputfield = extend({}, datetimeinputfield, {
    html: `${label.html}${bootstrapdatetimeinput.html}`
});

export default bootstrapdatetimeinputfield;