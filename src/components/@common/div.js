import { bgcolorSelectOptions, bgcolorClasses, dataComponentId, solidBorder, configurableComponent, resizableComponent, draggableComponent, droppableComponent, scaleOnResizeComponent } from '../common';
import { SelectInput, ColorInput } from '../../inputs/inputs';
import { divid } from './ids';

const div = {
    classes: ['gs-w'],
    image: "icons/div.svg",
    html: `<div ${dataComponentId}="${divid}" class="${solidBorder} ${configurableComponent} ${resizableComponent} ${draggableComponent} ${droppableComponent} ${scaleOnResizeComponent}" style="width: 500px; height: 300px;"></div>`,
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