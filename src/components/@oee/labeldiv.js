import { dataComponentId, dataRequiredSpan } from '../common';
import { labeldivid, spanid } from './ids';
import { ToggleInput } from '../../inputs/inputs';
import { requiredSpanSelector } from '../../util/selectors';

const validValues = ['required'];
const labeldiv = {
    name: 'Label Div',
    image: 'icons/label.svg',
    dropzone: '.allButton.dropzone',
    html: `<div ${dataComponentId}="${labeldivid}" class="everyOutbox-left draggable">
                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
                <span ${dataComponentId}="${spanid}" class="theme">Period</span>
                <span ${dataRequiredSpan} style="color:red">*</span>
           </div>`,
    properties: [{
        name: "Required",
        key: "display",
        htmlAttr: 'style',
        validValues,
        noValueAttr: true,
        inputtype: new ToggleInput(),
        init(element) {
            return $(element).find(requiredSpanSelector).css('display') == 'inline'
                ? validValues
                : []
        },
        onChange(node) {
            node.find(requiredSpanSelector).toggle();
            return node;
        },
        data: {
            on: 'required',
            off: ''
        }
    }]
};

export default labeldiv;