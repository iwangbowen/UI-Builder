import { bgcolorSelectOptions, bgcolorClasses, dataComponentId, dashedBorder, configurableComponent } from '../common';
import { SelectInput, ColorInput } from '../../inputs/inputs';
import { divid } from './ids';

const div = {
    classes: ['gs-w'],
    image: "icons/div.svg",
    html: `<div ${dataComponentId}="${divid}" class="${dashedBorder} ${configurableComponent}" style="width: 350px; height: 200px;"></div>`,
    name: "Div",
    resizable: true,
    droppable: true,
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