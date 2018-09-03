import { SectionInput, CssUnitInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const padding = {
    properties: [{
        key: "paddings_header",
        inputtype: new SectionInput(),
        name: false,
        sort: inc_base_sort(),
        data: { header: "Padding", expanded: false },
    }, {
        name: "Top",
        key: "padding-top",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Right",
        key: "padding-right",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Bottom",
        key: "padding-bottom",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Left",
        key: "padding-Left",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }]
};

export default padding;