import { TextInput, ToggleInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';
import { checkboxid, spanid } from './ids';
import input from './input';
import _ from 'lodash';

const checkboxcustom = _.extend({}, input, {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${checkboxid}">
             <div style="display:inline;">
                <input ${dataComponentId}="${checkboxid}" type="checkbox" class="checkboxInput"/>
                <label ${dataComponentId}="${spanid}">é€‰é¡¹1</label>
             </div>
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

export default checkboxcustom;