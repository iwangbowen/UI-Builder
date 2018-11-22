import { dataComponentId, formControl } from '../common';
import textinput from './textinput';
import { bootstraptextinputid } from './ids';
import extend from 'lodash/extend';

const bootstraptextinput = extend({}, textinput, {
    html: `<input ${dataComponentId}="${bootstraptextinputid}" type="text" class="${formControl}">`
});

export default bootstraptextinput;