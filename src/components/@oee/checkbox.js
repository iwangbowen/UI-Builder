import { TextInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { checkboxid, spanid } from './ids';
import $ from '../../../js/jquery.min';
import input from './input';

const checkbox = $.extend({}, input, {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${checkboxid}">
             <div style="display:inline;">
                <input ${dataComponentId}="${checkboxid}" type="checkbox" class="checkboxInput"/>
                <label ${dataComponentId}="${spanid}">选项1</label>
             </div>
            </div>`,
    properties: [{
        name: 'Onclick',
        key: 'onclick',
        htmlAttr: 'onclick',
        inputtype: TextInput
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
});

export default checkbox;