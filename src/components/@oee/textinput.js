import { inputTypeNames } from '../inputTypes';
import { dataComponentId, sortableClass } from '../common';
import input from './input';
import { textinputid } from './ids';
import { properties } from '../textinput';

const textinput = $.extend({}, input, {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    sortable: true,
    html: `
        <div class="form-item ${sortableClass}" ${dataComponentId}="${textinputid}">
            <div class="form-label" style="float: left; margin-left: 7px;">
                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
                <span data-component-id="html/span@oee" class="theme">Period</span>
                <span data-required-span-id="" style="color:red">*</span>
            </div>
            <div class="input-block" style="margin-left: 105px;">
                <input ${dataComponentId}="${textinputid}" type="text" class="form-control">
            </div>
        </div>`,
    properties
});

export default textinput;