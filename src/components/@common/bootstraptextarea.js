import { dataComponentId, formControl, formControlSm, draggableComponent, defaultInputWidth } from '../common';
import { bootstraptextareaid } from './ids';
import extend from 'lodash/extend';
import textareainput from './textareainput';

const bootstraptextareainput = extend({}, textareainput, {
    html: `<textarea class="${formControl} ${formControlSm} ${draggableComponent}" ${dataComponentId}="${bootstraptextareaid}" style="width: ${defaultInputWidth};"></textarea>`
});

export default bootstraptextareainput;