import { SectionInput, CssUnitInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const size = {
    properties: [{
        key: "size_header",
        inputtype: new SectionInput(),
        name: false,
        sort: inc_base_sort(),
        data: { header: "Size", expanded: false },
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Min Width",
        key: "min-width",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Min Height",
        key: "min-height",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Max Width",
        key: "max-width",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }, {
        name: "Max Height",
        key: "max-height",
        htmlAttr: "style",
        sort: inc_base_sort(),
        col: 6,
        inline: true,
        inputtype: new CssUnitInput()
    }]
};

export default size;