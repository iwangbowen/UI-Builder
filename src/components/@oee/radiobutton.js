import { TextInput } from '../../inputs/inputs';

const radiobutton = {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div class="everyOutbox-right draggable">
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