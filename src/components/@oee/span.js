import { TextInput } from '../../inputs/inputs';

const span = {
    name: "Span",
    image: "icons/text_input.svg",
    html: ``,
    properties: [{
        name: "For id",
        key: "for",
        htmlAttr: "for",
        inputtype: TextInput
    }, {
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: TextInput
    }]
};

export default span;