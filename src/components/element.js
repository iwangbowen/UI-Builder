import { SectionInput, TextInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const element = {
    name: "Element",
    properties: [{
        key: "element_header",
        inputtype: SectionInput,
        name: false,
        sort: inc_base_sort(),
        data: { header: "General" },
    }, {
        name: "Id",
        key: "id",
        htmlAttr: "id",
        sort: inc_base_sort(),
        inline: true,
        col: 6,
        inputtype: TextInput
    }, {
        name: "Class",
        key: "class",
        htmlAttr: "class",
        sort: inc_base_sort(),
        inline: true,
        col: 6,
        inputtype: TextInput
    }
    ]
};

export default element;