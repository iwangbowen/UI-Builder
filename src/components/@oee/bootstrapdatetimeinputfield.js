import { dataComponentId, sortableClass, formGroup } from '../common';
import { bootstrapdatetimeinputfieldid } from './ids';
import _ from 'lodash';
import label from './label';
import datetimeinputfield from './datetimeinputfield';
import bootstrapdatetimeinput from './bootstrapdatetimeinput';

const bootstrapdatetimeinputfield = _.extend({}, datetimeinputfield, {
    html: `<div class="${formGroup} ${sortableClass}" ${dataComponentId}="${bootstrapdatetimeinputfieldid}">
               ${label.html}
               ${bootstrapdatetimeinput.html}
           </div>`
});

export default bootstrapdatetimeinputfield;