import { dataComponentId, sortableClass, formGroup } from '../common';
import _ from 'lodash';
import label from './label';
import bootstraptextareainput from './bootstraptextarea';
import textareainputfield from './textareainputfield';
import { bootstraptextareafieldid } from './ids';

const bootstraptextareainputfield = _.extend({}, textareainputfield, {
    html: `<div ${dataComponentId}="${bootstraptextareafieldid}" class="${formGroup} ${sortableClass}">
            ${label.html}
            ${bootstraptextareainput.html}
           </div>`
});

export default bootstraptextareainputfield;