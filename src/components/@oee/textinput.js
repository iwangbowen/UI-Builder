import { TextInput, SelectInput, NumberInput, ToggleInput } from '../../inputs/inputs';
import { inputTypes, inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';
const textinput = {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="everyOutbox-right draggable">
            <div class="btn-group">
                <div class="dailyBox">
                    <input ${dataComponentId}="html/textinput@oee" lustyle="height: 2.8rem;width:13rem" type="text" class="form-control"/>
                 </div>
            </div>
           </div>`,
    properties: [{
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: TextInput
    }, {
        name: 'Maxlength',
        key: 'maxlength',
        htmlAttr: 'maxlength',
        inputtype: NumberInput
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: 'Name',
        key: 'name',
        htmlAttr: 'name',
        inputtype: TextInput
    }, {
        name: 'Type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: SelectInput,
        data: {
            options: inputTypes
        }
    }, {
        name: "Readonly",
        key: "readonly",
        htmlAttr: 'readonly',
        validValues: ["readonly"],
        noValueAttr: true,
        inputtype: ToggleInput,
        data: {
            on: 'readonly',
            off: ''
        }
    }]
};

export default textinput;