import { dataComponentId, formControl, formControlSm } from '../common';
import { bootstraptextareaid } from './ids';
import extend from 'lodash/extend';
import textareainput from './textareainput';

const bootstraptextareainput = extend({}, textareainput, {
    html: `<textarea class="${formControl} ${formControlSm}" ${dataComponentId}="${bootstraptextareaid}" rows="3"></textarea>`
});

export default bootstraptextareainput;