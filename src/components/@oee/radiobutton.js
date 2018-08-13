import { TextInput, ToggleInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { radiobuttonid } from './ids';
import $ from '../../../js/jquery.min';
import input from './input';

const radiobutton = $.extend({}, input, {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div ${dataComponentId}="${radiobuttonid}" class="everyOutbox-right draggable">
            <div style="display:inline;"><input class="radioInput" type="radio" value="" /><span ${dataComponentId}="html/span@oee">单选1</span></div>
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
    }, {
        name: "Required",
        key: "required",
        htmlAttr: 'required',
        validValues: ["required"],
        noValueAttr: true,
        inputtype: ToggleInput,
        data: {
            on: 'required',
            off: ''
        }
    }]
});

export default radiobutton;