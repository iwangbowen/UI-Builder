import { LinkInput, TextInput } from '../../inputs/inputs';

const link = {
    nodes: ["a"],
    name: "Link",
    properties: [{
        name: "Url",
        key: "href",
        htmlAttr: "href",
        inputtype: LinkInput
    }, {
        name: "Target",
        key: "target",
        htmlAttr: "target",
        inputtype: TextInput
    }]
};

export default link;