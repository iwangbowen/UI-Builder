import { SectionInput, TextInput, Select2Input } from '../inputs/inputs';
import { inc_base_sort } from './common';

const element = {
    name: "Element",
    properties: [{
        key: "element_header",
        inputtype: new SectionInput(),
        name: false,
        sort: inc_base_sort(),
        data: { header: "General" },
    }, {
        name: "Class",
        key: "class",
        htmlAttr: "class",
        sort: inc_base_sort(),
        inline: true,
        col: 12,
        inputtype: new Select2Input()
    }, {
        name: "Id",
        key: "id",
        htmlAttr: "id",
        sort: inc_base_sort(),
        inline: true,
        col: 6,
        inputtype: new TextInput()
    }
    ]
};

export default element;