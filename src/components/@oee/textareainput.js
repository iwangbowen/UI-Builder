import { TextInput, NumberInput, ToggleInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { textareaid } from './ids';
import input from './input';

const textareainput = $.extend({}, input, {
    nodes: [`textarea`],
    name: "Text Area",
    image: "icons/text_area.svg",
    html: `<div ${dataComponentId}="${textareaid}" class="form-group draggable"><textarea class="form-control"></textarea></div>`,
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

export default textareainput;