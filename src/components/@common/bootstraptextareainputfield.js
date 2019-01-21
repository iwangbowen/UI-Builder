import { dataComponentId, sortableClass, formGroup, rowClass, col_sm_9 } from '../common';
import extend from 'lodash/extend';
import label from './label';
import bootstraptextareainput from './bootstraptextarea';
import textareainputfield from './textareainputfield';
import { bootstraptextareafieldid } from './ids';

const bootstraptextareainputfield = extend({}, textareainputfield, {
    html: `${label.html}${bootstraptextareainput.html}`
});

export default bootstraptextareainputfield;