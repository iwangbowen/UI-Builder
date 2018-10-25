import { bgcolorSelectOptions, bgcolorClasses, dataComponentId } from '../common';
import { SelectInput, ColorInput } from '../../inputs/inputs';
import { divid } from './ids';

const div = {
    classes: ["container", "container-fluid"],
    image: "icons/div.svg",
    html: `<div ${dataComponentId}="${divid}" style="width: 350px; height: 200px;"></div>`,
    name: "Div",
    properties: [
        {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: new SelectInput(),
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
            inputtype: new SelectInput(),
            data: {
                options: bgcolorSelectOptions
            }
        },
        {
            name: "Background Color",
            key: "background-color",
            htmlAttr: "style",
            inputtype: new ColorInput(),
        },
        {
            name: "Text Color",
            key: "color",
            htmlAttr: "style",
            inputtype: new ColorInput(),
        }],
};

export default div;