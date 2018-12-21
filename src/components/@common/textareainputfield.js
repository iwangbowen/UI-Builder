import { dataComponentId, formItemClass, sortableClass } from '../common';
import { textareafieldid } from './ids';
import extend from 'lodash/extend';
import inputfield from './inputfield';
import formlabel from './formlabel';
import textareainput from './textareainput';

const textareainputfield = extend({}, inputfield, {
    nodes: [`textarea`],
    name: "Textarea Field",
    image: "icons/text_area.svg",
    html: `<div style="display: flex;" ${dataComponentId}="${textareafieldid}" class="${formItemClass} ${sortableClass} form-group">
            ${formlabel.html}
            ${textareainput.html}
           </div>`
});

export default textareainputfield;