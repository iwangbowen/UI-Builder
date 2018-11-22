import { manualselectinputid } from './ids';
import { dataComponentId } from '../common';
import input from './input';
import { manualselectProperties as properties, manualselectBeforeInit as beforeInit } from '../properties/select';
import extend from 'lodash/extend';

const manualselectinput = extend({}, input, {
    nodes: ["select"],
    name: "Manual Select",
    image: "icons/select_input.svg",
    html: `<div class="input-block">
            <select ${dataComponentId}="${manualselectinputid}" class="form-control">
                <option value="value1">Text 1</option>
                <option value="value2">Text 2</option>
            </select>
           </div>`,
    beforeInit,
    properties
});

export default manualselectinput;