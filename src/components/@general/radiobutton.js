import { TextInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';

const radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<label ${dataComponentId}="html/radiobutton@general" class="radio"><input type="radio"> Radio</label>`,
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
};

export default radiobutton;