import { dataComponentId, formControl, dataConfigInfo, dataCalendarId, formControlSm } from '../common';
import { bootstrapdatetimeinputid } from './ids';
import extend from 'lodash/extend';
import datetimeinput from './datetimeinput';

const bootstrapdatetimeinput = extend({}, datetimeinput, {
    // Add element inline style attribute to prevent Wdate library from
    // overriding bootstrap .form-control height
    html: `<input style="height: 28px;" ${dataCalendarId} ${dataComponentId}="${bootstrapdatetimeinputid}" ${dataConfigInfo}="{'dateFmt': 'yyyy-MM-dd HH:mm'}" type="text" class="${formControl} ${formControlSm} Wdate">`
});

export default bootstrapdatetimeinput;