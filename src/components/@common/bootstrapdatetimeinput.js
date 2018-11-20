import { dataComponentId, formControl, dataConfigInfo } from '../common';
import { bootstrapdatetimeinputid } from './ids';
import _ from 'lodash';
import datetimeinput from './datetimeinput';

const bootstrapdatetimeinput = _.extend({}, datetimeinput, {
    // Add element inline style attribute to prevent Wdate library from
    // overriding bootstrap .form-control height
    html: `<input style="height: calc(2.25rem + 2px);" ${dataComponentId}="${bootstrapdatetimeinputid}" ${dataConfigInfo}="{'dateFmt': 'yyyy-MM-dd HH:mm'}" type="text" class="${formControl} Wdate">`
});

export default bootstrapdatetimeinput;