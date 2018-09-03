import { TextInput } from '../../inputs/inputs';

const text = {
    name: "Text",
    image: "icons/text_input.svg",
    html: ``,
    nodes: ['b', 'big', 'em', 'i', 'small', 'strong',
        'sub', 'sup', 'ins', 'del', 's', 'strike', 'u'],
    properties: [{
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: new TextInput()
    }]
};

export default text;