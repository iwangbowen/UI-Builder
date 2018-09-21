import { TextInput } from '../../inputs/inputs';
import { spanid } from './ids';

const span = {
    name: "Span",
    image: "icons/text_input.svg",
    nodes: ['span'],
    html: `<div class="form-label" style="float: left; margin-left: 7px;">
            <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
            <span data-component-id="${spanid}" class="theme">Period</span>
            <span data-required-span-id="" style="color:red">*</span>
           </div>`,
    properties: [{
        name: "For id",
        key: "for",
        htmlAttr: "for",
        inputtype: new TextInput()
    }, {
        name: 'Text',
        key: 'text',
        htmlAttr: 'text',
        inputtype: new TextInput()
    }]
};

export default span;