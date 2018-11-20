import { dataComponentId, formControl } from '../common';
import textinput from './textinput';
import { bootstraptextinputid } from './ids';
import _ from 'lodash';

const bootstraptextinput = _.extend({}, textinput, {
    html: `<input ${dataComponentId}="${bootstraptextinputid}" type="text" class="${formControl}">`
});

export default bootstraptextinput;