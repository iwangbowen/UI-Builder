import { inputTypeNames } from '../inputTypes';
import { dataComponentId } from '../common';
import input from './input';
import { textinputid } from './ids';
import { properties } from '../textinput';

const textinput = $.extend({}, input, {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${textinputid}">
            <div class="btn-group">
                <div class="dailyBox">
                    <input ${dataComponentId}="${textinputid}" lustyle="height: 2.8rem;width:13rem" type="text" class="form-control"/>
                 </div>
            </div>
           </div>`,
    properties
});

export default textinput;