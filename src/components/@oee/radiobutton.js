import { TextInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';

const radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div ${dataComponentId}="html/radiobutton@oee" class="everyOutbox-right draggable">
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
    }]
};

export default radiobutton;