import { popupmanualselectinputid } from './ids';
import { dataComponentId, sortableClass } from '../common';
import manualselectinput from './manualselectinput';

const popupmanualselectinput = $.extend({}, manualselectinput, {
    name: "Popup Manual Select",
    sortable: true,
    html: `<div class="everyInput ${sortableClass}" ${dataComponentId}="${popupmanualselectinputid}">
            <span class="inputText">Options</span>
			<select class="addInput" type="text" name="active" ${dataComponentId}="${popupmanualselectinputid}">
                <option value="value1">Text 1</option>
                <option value="value2">Text 2</option>
			</select>
		   </div>
    `
});

export default popupmanualselectinput;