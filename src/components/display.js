import { inc_base_sort } from './common';
import { SectionInput, SelectInput, RadioButtonInput, CssUnitInput, ColorInput, RangeInput } from '../inputs/inputs';
import { overflowProperty } from './properties/properties';
import extend from 'lodash/extend';

const display = {
    properties: [
        {
            key: "display_header",
            inputtype: new SectionInput(),
            name: false,
            sort: inc_base_sort(),
            data: { header: "Display", expanded: false },
        }, {
            name: "Display",
            key: "display",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new SelectInput(),
            validValues: ["block", "inline", "inline-block", "none"],
            data: {
                options: [{
                    value: "block",
                    text: "Block"
                }, {
                    value: "inline",
                    text: "Inline"
                }, {
                    value: "inline-block",
                    text: "Inline Block"
                }, {
                    value: "none",
                    text: "none"
                }]
            }
        }, {
            name: "Position",
            key: "position",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new SelectInput(),
            validValues: ["static", "fixed", "relative", "absolute"],
            data: {
                options: [{
                    value: "static",
                    text: "Static"
                }, {
                    value: "fixed",
                    text: "Fixed"
                }, {
                    value: "relative",
                    text: "Relative"
                }, {
                    value: "absolute",
                    text: "Absolute"
                }]
            }
        }, {
            name: "Top",
            key: "top",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            parent: "",
            inputtype: new CssUnitInput()
        }, {
            name: "Left",
            key: "left",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            parent: "",
            inputtype: new CssUnitInput()
        }, {
            name: "Bottom",
            key: "bottom",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            parent: "",
            inputtype: new CssUnitInput()
        }, {
            name: "Right",
            key: "right",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            parent: "",
            inputtype: new CssUnitInput()
        }, extend({}, overflowProperty, {
            sort: inc_base_sort(),
        }), extend({}, overflowProperty, {
            name: 'Overflow X',
            key: "overflow-x",
            sort: inc_base_sort()
        }), extend({}, overflowProperty, {
            name: 'Overflow Y',
            key: "overflow-y",
            sort: inc_base_sort()
        }), {
            name: "Float",
            key: "float",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 12,
            inline: true,
            inputtype: new RadioButtonInput(),
            data: {
                extraclass: "btn-group-sm btn-group-fullwidth",
                options: [{
                    value: "none",
                    icon: "la la-close",
                    //text: "None",
                    title: "None",
                    checked: true,
                }, {
                    value: "left",
                    //text: "Left",
                    title: "Left",
                    icon: "la la-align-left",
                    checked: false,
                }, {
                    value: "right",
                    //text: "Right",
                    title: "Right",
                    icon: "la la-align-right",
                    checked: false,
                }],
            }
        }, {
            name: "Opacity",
            key: "opacity",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 12,
            inline: true,
            parent: "",
            inputtype: new RangeInput(),
            data: {
                max: 1, //max zoom level
                min: 0,
                step: 0.1
            },
        }, {
            name: "Background Color",
            key: "background-color",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            htmlAttr: "style",
            inputtype: new ColorInput(),
        }, {
            name: "Text Color",
            key: "color",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            htmlAttr: "style",
            inputtype: new ColorInput(),
        }]
};

export default display;