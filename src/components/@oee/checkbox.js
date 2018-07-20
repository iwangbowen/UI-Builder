import { TextInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';

const checkbox = {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: `<div class="everyOutbox-right draggable">
             <div style="display:inline;">
                <input ${dataComponentId}="html/checkbox@oee" type="checkbox" class="checkboxInput"/>
                <label ${dataComponentId}="html/span@oee">选项1</label>
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
};

export default checkbox;