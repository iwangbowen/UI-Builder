import { SectionInput, CssUnitInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const margin = {
    properties: [{
        key: "margins_header",
        inputtype: new SectionInput(),
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
        inputtype: new CssUnitInput()
    }, {
        name: "Right",
        key: "margin-right",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Bottom",
        key: "margin-bottom",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Left",
        key: "margin-left",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }]
};

export default margin;