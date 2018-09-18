import { inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';
import { popuptextinputid } from './ids';
import input from './input';
import { properties } from '../textinput';

const popuptextinput = $.extend({}, input, {
    name: "Popup Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    sortable: true,
    html: `<div class="everyInput" ${dataComponentId}="${popuptextinputid}">
            <div class="inputText">Label</div>
            <input class="addInput" type="text" onfocus="this.removeAttribute('readonly')" value="" autocomplete="off">
           </div>`,
    properties
});

export default popuptextinput;