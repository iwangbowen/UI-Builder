import { bgcolorSelectOptions, bgcolorClasses, dataComponentId } from '../common';
import { SelectInput, ColorInput } from '../../inputs/inputs';
import { divid } from './ids';

const div = {
    classes: ['gs-w'],
    image: "icons/div.svg",
    html: `<div ${dataComponentId}="${divid}" style="width: 350px; height: 200px;"></div>`,
    name: "Div",
    properties: [
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