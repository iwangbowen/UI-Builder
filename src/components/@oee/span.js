import { TextInput } from '../../inputs/inputs';

const span = {
    name: "Span",
    image: "icons/text_input.svg",
    nodes: ['span'],
    html: ``,
    properties: [{
        name: "For id",
        key: "for",
        htmlAttr: "for",
        inputtype: new TextInput()
    }, {
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: new TextInput()
    }]
};

export default span;