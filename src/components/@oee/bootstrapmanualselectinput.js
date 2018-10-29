import { bootstrapmanualselectinputid } from './ids';
import { dataComponentId, formControl } from '../common';
import _ from 'lodash';
import manualselectinput from './manualselectinput';

const bootstrapmanualselectinput = _.extend({}, manualselectinput, {
    html: `<select ${dataComponentId}="${bootstrapmanualselectinputid}" class="${formControl}">
                <option value="value1">Text 1</option>
                <option value="value2">Text 2</option>
           </select>`
});

export default bootstrapmanualselectinput;