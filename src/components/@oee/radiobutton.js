import { TextInput } from '../../inputs/inputs';
import { dataComponentId } from '../common';

const radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div ${dataComponentId}="html/radiobutton@oee" class="everyOutbox-right draggable">
            <input class="radioInput" name="Fruit" type="radio" value="" />
            <input class="radioInput" name="Fruit" type="radio" value="" />
            <input class="radioInput" name="Fruit" type="radio" value="" />
            <input class="radioInput" name="Fruit" type="radio" value="" />
            <input class="radioInput" name="Fruit" type="radio" value="" />
            <input class="radioInput" name="Fruit" type="radio" value="" />
        </div>`,
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
};

export default radiobutton;