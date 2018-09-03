import { SectionInput, SelectInput, CssUnitInput, ColorInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const border = {
    properties: [{
        key: "border_header",
        inputtype: new SectionInput(),
        name: false,
        sort: inc_base_sort(),
        data: { header: "Border", expanded: false },
    }, {
        name: "Style",
        key: "border-style",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 12,
        inline: true,
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "solid",
                text: "Solid"
            }, {
                value: "dotted",
                text: "Dotted"
            }, {
                value: "dashed",
                text: "Dashed"
            }],
        }
    }, {
        name: "Width",
        key: "border-width",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: CssUnitInput
    }, {
        name: "Color",
        key: "border-color",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        htmlAttr: "style",
        inputtype: ColorInput,
    }]
};

export default border;