import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_10 } from '../common';
import _ from 'lodash';
import label from './label';
import bootstraptextareainput from './bootstraptextarea';
import textareainputfield from './textareainputfield';
import { bootstraptextareafieldid } from './ids';

const bootstraptextareainputfield = _.extend({}, textareainputfield, {
    html: `<div ${dataComponentId}="${bootstraptextareafieldid}" class="${formGroup} ${sortableClass} ${rowClass}">
            ${label.html}
            <div class="${col_sm_10}">
                ${bootstraptextareainput.html}
            </div>
           </div>`
});

export default bootstraptextareainputfield;