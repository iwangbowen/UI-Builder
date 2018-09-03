import { TextInput, SelectInput, NumberInput, ToggleInput } from '../../inputs/inputs';
import { inputTypes, inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';
import input from './input';
import { textinputid } from './ids';

const textinput = $.extend({}, input, {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${textinputid}">
            <div class="btn-group">
                <div class="dailyBox">
                    <input ${dataComponentId}="${textinputid}" lustyle="height: 2.8rem;width:13rem" type="text" class="form-control"/>
                 </div>
            </div>
           </div>`,
    properties: [{
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: new TextInput()
    }, {
        name: 'Onchange',
        key: 'onchange',
        htmlAttr: 'onchange',
        inputtype: new TextInput()
    }, {
        name: 'Maxlength',
        key: 'maxlength',
        htmlAttr: 'maxlength',
        inputtype: new NumberInput()
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: new TextInput()
    }, {
        name: 'Name',
        key: 'name',
        htmlAttr: 'name',
        inputtype: new TextInput()
    }, {
        name: 'Type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: new SelectInput(),
        data: {
            options: inputTypes
        }
    }, {
        name: "Readonly",
        key: "readonly",
        htmlAttr: 'readonly',
        validValues: ["readonly"],
        noValueAttr: true,
        inputtype: new ToggleInput(),
        data: {
            on: 'readonly',
            off: ''
        }
    }, {
        name: "Required",
        key: "required",
        htmlAttr: 'required',
        validValues: ["required"],
        noValueAttr: true,
        inputtype: new ToggleInput(),
        data: {
            on: 'required',
            off: ''
        }
    }]
});

export default textinput;