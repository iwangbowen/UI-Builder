import { TextInput, SelectInput } from '../../inputs/inputs';
import { inputTypes, inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';

const textinput = {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="form-group" style="display: inline-block;"><label>Text</label><input ${dataComponentId}="html/textinput@general" type="text" class="form-control"></div></div>`,
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
    }, {
        name: 'type',
        key: 'type',
        htmlAttr: 'type',
        inputtype: SelectInput,
        data: {
            options: inputTypes
        }
    }]
};

export default textinput;