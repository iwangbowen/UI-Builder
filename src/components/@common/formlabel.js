import { spanid } from './ids';
import { dataRequiredSpan, labelAlignStyle } from '../common';

const formlabel = {
    name: "Form Label",
    image: "icons/label.svg",
    html: `<div class="form-label" style="${labelAlignStyle}">
            <i class="fa fa-caret-square-o-right" aria-hidden="true"></i>
            <span data-component-id="${spanid}" class="theme">Period</span>
            <span ${dataRequiredSpan} style="color:red; display: none;">*</span>
           </div>`
};

export default formlabel;