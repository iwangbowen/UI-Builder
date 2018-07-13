import { TextInput } from '../../inputs/inputs';

const radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: '<label class="radio"><input type="radio"> Radio</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
};

export default radiobutton;