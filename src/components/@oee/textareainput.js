import { TextInput, NumberInput, ToggleInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { textareaid } from './ids';
import $ from '../../../js/jquery.min';
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
});

export default textareainput;