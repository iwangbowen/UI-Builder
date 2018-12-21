import { inputTypeNames } from '../inputTypes';
import { dataComponentId, dataConfigInfo, dataCalendarId, inputAlignStyle } from '../common';
import input from './input';
import { datetimeinputid } from './ids';
import {datetimeinputProperties as properties} from '../properties/input';
import extend from 'lodash/extend';

const datetimeinput = extend({}, input, {
    name: "Datetime Input",
    attributes: { "type": inputTypeNames },
    image: "icons/calendar.svg",
    sortable: true,
    html: `<div class="input-block" style="${inputAlignStyle}">
            <input ${dataCalendarId} ${dataConfigInfo}="{'dateFmt': 'yyyy-MM-dd HH:mm'}" ${dataComponentId}="${datetimeinputid}" type="text" class="form-control Wdate">
           </div>`,
    properties
});

export default datetimeinput;