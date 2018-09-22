import { spanid } from './ids';
import { dataRequiredSpan } from '../common';

const formlabel = {
    name: "Form Label",
    image: "icons/label.svg",
    html: `<div class="form-label">
            <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
            <span data-component-id="${spanid}" class="theme">Period</span>
            <span ${dataRequiredSpan} style="color:red; display: none;">*</span>
           </div>`
};

export default formlabel;