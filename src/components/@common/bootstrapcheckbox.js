import {
    dataComponentId, cloneableComponent, deletableComponent,
    formCheck, formCheckLabel, formCheckInput
} from '../common';
import { bootstrapcheckboxid } from './ids';
import extend from 'lodash/extend';
import checkbox from './checkbox';
import { checkboxProperties as properties } from '../properties/input';

const bootstrapcheckbox = extend({}, checkbox, {
    html: `<div class="${formCheck} ${cloneableComponent} ${deletableComponent}" ${dataComponentId}="${bootstrapcheckboxid}">
            <input class="${formCheckInput}" type="checkbox" value="option1" ${dataComponentId}="${bootstrapcheckboxid}">
            <label class="${formCheckLabel}">Default checkbox</label>
           </div>`,
    properties
});

export default bootstrapcheckbox;