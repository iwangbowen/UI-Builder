import {TextInput} from '../../inputs/inputs';

const textinput = {
    name: "Text Input",
    attributes: { "type": "text" },
    image: "icons/text_input.svg",
    html: '<div class="form-group" style="display: inline-block;"><label>Text</label><input type="text" class="form-control"></div></div>',
    properties: [{
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }]
};

export default textinput;