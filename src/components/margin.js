import { SectionInput, CssUnitInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const margin = {
    properties: [{
        key: "margins_header",
        inputtype: SectionInput,
        name: false,
        sort: inc_base_sort(),
        data: { header: "Margin", expanded: false },
    }, {
        name: "Top",
        key: "margin-top",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: CssUnitInput
    }, {
        name: "Right",
        key: "margin-right",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: CssUnitInput
    }, {
        name: "Bottom",
        key: "margin-bottom",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: CssUnitInput
    }, {
        name: "Left",
        key: "margin-Left",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: CssUnitInput
    }]
};

export default margin;