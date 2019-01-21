import { dataComponentId, formControl, formControlSm, draggableComponent } from '../common';
import { bootstraptextareaid } from './ids';
import extend from 'lodash/extend';
import textareainput from './textareainput';

const bootstraptextareainput = extend({}, textareainput, {
    html: `<textarea class="${formControl} ${formControlSm} ${draggableComponent}" ${dataComponentId}="${bootstraptextareaid}"></textarea>`
});

export default bootstraptextareainput;