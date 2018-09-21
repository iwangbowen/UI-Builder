import { inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';
import input from './input';
import { textinputid } from './ids';
import { properties } from '../textinput';

const textinput = $.extend({}, input, {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    sortable: true,
    html: `<div class="input-block" style="margin-left: 105px;">
            <input ${dataComponentId}="${textinputid}" type="text" class="form-control">
           </div>`,
    properties
});

export default textinput;