import { dataComponentId, sortableClass, formItemClass } from '../common';
import fileinput from './fileinput';
import formlabel from './formlabel';
import { fileinputfieldid } from './ids';
import _ from 'lodash';
import inputfield from './inputfield';

const fileinputfield = _.extend({}, inputfield, {
    name: 'File Input Field',
    attributes: { 'type': 'file' },
    image: 'icons/upload.svg',
    html: `<div class="${formItemClass} ${sortableClass}" ${dataComponentId}="${fileinputfieldid}">
            ${formlabel.html}
			${fileinput.html}
           </div>`,
});

export default fileinputfield;