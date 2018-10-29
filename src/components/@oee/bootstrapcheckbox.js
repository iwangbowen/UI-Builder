import {
    dataComponentId, cloneableComponent, deletableComponent,
    formCheck, formCheckLabel, formCheckInput
} from '../common';
import { bootstrapcheckboxid } from './ids';
import _ from 'lodash';
import checkbox from './checkbox';

const bootstrapcheckbox = _.extend({}, checkbox, {
    html: `<div class="${formCheck} ${cloneableComponent} ${deletableComponent}" ${dataComponentId}="${bootstrapcheckboxid}">
            <input class="${formCheckInput}" type="checkbox" value="option1" ${dataComponentId}="${bootstrapcheckboxid}">
            <label class="${formCheckLabel}">Default checkbox</label>
           </div>`
});

export default bootstrapcheckbox;