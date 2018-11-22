import { bootstrapmanualselectinputid } from './ids';
import { dataComponentId, formControl } from '../common';
import extend from 'lodash/extend';
import manualselectinput from './manualselectinput';

const bootstrapmanualselectinput = extend({}, manualselectinput, {
    html: `<select ${dataComponentId}="${bootstrapmanualselectinputid}" class="${formControl}">
                <option value="value1">Text 1</option>
                <option value="value2">Text 2</option>
           </select>`
});

export default bootstrapmanualselectinput;