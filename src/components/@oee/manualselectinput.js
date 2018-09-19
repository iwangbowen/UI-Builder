import { manualselectinputid } from './ids';
import { dataComponentId } from '../common';
import input from './input';
import { manualselectProperties as properties, manualselectBeforeInit as beforeInit } from '../select';

const autoselectinput = $.extend({}, input, {
    nodes: ["select"],
    name: "Manual Select",
    image: "icons/select_input.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${manualselectinputid}">
            <div class="btn-group">
                <div class="dailyBox">
                    <select ${dataComponentId}="${manualselectinputid}" class="form-control fundodooSelect" lustyle="height:2.8rem;width:13rem">
                        <option value="value1">Text 1</option>
                        <option value="value2">Text 2</option>
                    </select>
                </div>
            </div>
           </div>
    `,
    beforeInit,
    properties
});

export default autoselectinput;