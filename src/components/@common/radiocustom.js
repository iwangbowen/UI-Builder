import { TextInput, ToggleInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { radiobuttonid } from './ids';
import input from './input';
import _ from 'lodash';

const radiocustom = _.extend({}, input, {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div ${dataComponentId}="${radiobuttonid}" class="everyOutbox-right draggable">
            <div style="display:inline;"><input class="radioInput" type="radio" value="" /><span ${dataComponentId}="html/span@common">ĺé1</span></div>
           </div>`,
    properties: [{
        name: 'Onclick',
        key: 'onclick',
        htmlAttr: 'onclick',
        inputtype: new TextInput()
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: new TextInput()
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: new TextInput()
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

export default radiocustom;