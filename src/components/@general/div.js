import { bgcolorSelectOptions, bgcolorClasses } from '../common';
import { SelectInput, ColorInput } from '../../inputs/inputs';

const div = {
    classes: ["container", "container-fluid"],
    image: "icons/div.svg",
    html: '<div style="width: 350px; height: 200px;" class="dropzone"></div>',
    name: "Div",
    properties: [
        {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: SelectInput,
            validValues: ["container", "container-fluid"],
            data: {
                options: [{
                    value: "container",
                    text: "Default"
                }, {
                    value: "container-fluid",
                    text: "Fluid"
                }]
            }
        },
        {
            name: "Background",
            key: "background",
            htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        },
        {
            name: "Background Color",
            key: "background-color",
            htmlAttr: "style",
            inputtype: ColorInput,
        },
        {
            name: "Text Color",
            key: "color",
            htmlAttr: "style",
            inputtype: ColorInput,
        }],
};

export default div;