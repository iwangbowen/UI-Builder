import { dataComponentId, formControl } from '../common';
import { bootstraptextareaid } from './ids';
import _ from 'lodash';
import textareainput from './textareainput';

const bootstraptextareainput = _.extend({}, textareainput, {
    html: `<textarea class="${formControl}" ${dataComponentId}="${bootstraptextareaid}" rows="3"></textarea>`
});

export default bootstraptextareainput;