import { SectionInput, SelectInput, RadioButtonInput, CssUnitInput, ColorInput } from '../inputs/inputs';
import { inc_base_sort } from './common';

const typography = {
    properties: [
        {
            key: "typography_header",
            inputtype: new SectionInput(),
            name: false,
            sort: inc_base_sort(),
            data: { header: "Typography", expanded: false },
        }, {
            name: "Font family",
            key: "font-family",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new SelectInput(),
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "Arial, Helvetica, sans-serif",
                    text: "Arial"
                }, {
                    value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
                    text: 'Lucida Grande'
                }, {
                    value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
                    text: 'Palatino Linotype'
                }, {
                    value: '"Times New Roman", Times, serif',
                    text: 'Times New Roman'
                }, {
                    value: "Georgia, serif",
                    text: "Georgia, serif"
                }, {
                    value: "Tahoma, Geneva, sans-serif",
                    text: "Tahoma"
                }, {
                    value: 'Comic Sans MS, cursive, sans-serif',
                    text: 'Comic Sans'
                }, {
                    value: 'Verdana, Geneva, sans-serif',
                    text: 'Verdana'
                }, {
                    value: 'Impact, Charcoal, sans-serif',
                    text: 'Impact'
                }, {
                    value: 'Arial Black, Gadget, sans-serif',
                    text: 'Arial Black'
                }, {
                    value: 'Trebuchet MS, Helvetica, sans-serif',
                    text: 'Trebuchet'
                }, {
                    value: 'Courier New", Courier, monospace',
                    text: 'Courier New", Courier, monospace'
                }, {
                    value: 'Brush Script MT, sans-serif',
                    text: 'Brush Script'
                }]
            }
        }, {
            name: "Font weight",
            key: "font-weight",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new SelectInput(),
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "100",
                    text: "Thin"
                }, {
                    value: "200",
                    text: "Extra-Light"
                }, {
                    value: "300",
                    text: "Light"
                }, {
                    value: "400",
                    text: "Normal"
                }, {
                    value: "500",
                    text: "Medium"
                }, {
                    value: "600",
                    text: "Semi-Bold"
                }, {
                    value: "700",
                    text: "Bold"
                }, {
                    value: "800",
                    text: "Extra-Bold"
                }, {
                    value: "900",
                    text: "Ultra-Bold"
                }],
            }
        }, {
            name: "Text align",
            key: "text-align",
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
                    value: "center",
                    //text: "Center",
                    title: "Center",
                    icon: "la la-align-center",
                    checked: false,
                }, {
                    value: "right",
                    //text: "Right",
                    title: "Right",
                    icon: "la la-align-right",
                    checked: false,
                }, {
                    value: "justify",
                    //text: "justify",
                    title: "Justify",
                    icon: "la la-align-justify",
                    checked: false,
                }],
            },
        }, {
            name: "Line height",
            key: "line-height",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new CssUnitInput()
        }, {
            name: "Letter spacing",
            key: "letter-spacing",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new CssUnitInput()
        }, {
            name: "Text decoration",
            key: "text-decoration-line",
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
                    value: "underline",
                    //text: "Left",
                    title: "underline",
                    icon: "la la-long-arrow-down",
                    checked: false,
                }, {
                    value: "overline",
                    //text: "Right",
                    title: "overline",
                    icon: "la la-long-arrow-up",
                    checked: false,
                }, {
                    value: "line-through",
                    //text: "Right",
                    title: "Line Through",
                    icon: "la la-strikethrough",
                    checked: false,
                }, {
                    value: "underline overline",
                    //text: "justify",
                    title: "Underline Overline",
                    icon: "la la-arrows-v",
                    checked: false,
                }],
            },
        }, {
            name: "Decoration Color",
            key: "text-decoration-color",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            htmlAttr: "style",
            inputtype: new ColorInput(),
        }, {
            name: "Decoration style",
            key: "text-decoration-style",
            htmlAttr: "style",
            sort: inc_base_sort(),
            col: 6,
            inline: true,
            inputtype: new SelectInput(),
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "solid",
                    text: "Solid"
                }, {
                    value: "wavy",
                    text: "Wavy"
                }, {
                    value: "dotted",
                    text: "Dotted"
                }, {
                    value: "dashed",
                    text: "Dashed"
                }, {
                    value: "double",
                    text: "Double"
                }],
            }
        }]
};

export default typography;