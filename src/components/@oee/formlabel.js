import { spanid } from './ids';

const formlabel = {
    name: "Form Label",
    image: "icons/label.svg",
    html: `<div class="form-label" style="float: left; margin-left: 7px;">
            <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
            <span data-component-id="${spanid}" class="theme">Period</span>
            <span data-required-span-id="" style="color:red">*</span>
           </div>`
};

export default formlabel;