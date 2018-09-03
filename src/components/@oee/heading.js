import { changeNodeName } from '../common';
import { SelectInput } from '../../inputs/inputs';

const heading =  {
    image: "icons/heading.svg",
    name: "Heading",
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    html: "<h1>Heading</h1>",

    properties: [
        {
            name: "Size",
            key: "id",
            htmlAttr: "id",
            inputtype: new SelectInput(),
            onChange: function (node, value) {

                return changeNodeName(node, "h" + value);
            },
            init: function (node) {
                var regex;
                regex = /H(\d)/.exec(node.nodeName);
                if (regex && regex[1]) {
                    return regex[1]
                }
                return 1
            },

            data: {
                options: [{
                    value: "1",
                    text: "1"
                }, {
                    value: "2",
                    text: "2"
                }, {
                    value: "3",
                    text: "3"
                }, {
                    value: "4",
                    text: "4"
                }, {
                    value: "5",
                    text: "5"
                }, {
                    value: "6",
                    text: "6"
                }]
            },
        }]
};

export default heading;