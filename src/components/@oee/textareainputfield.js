import { dataComponentId, formItemClass, sortableClass } from '../common';
import { textareafieldid } from './ids';
import _ from 'lodash';
import inputfield from './inputfield';
import formlabel from './formlabel';
import textareainput from './textareainput';

const textareainputfield = _.extend({}, inputfield, {
    nodes: [`textarea`],
    name: "Textarea Field",
    image: "icons/text_area.svg",
    html: `<div ${dataComponentId}="${textareafieldid}" class="${formItemClass} ${sortableClass} form-group">
            ${formlabel.html}
            ${textareainput.html}
           </div>`
});

export default textareainputfield;