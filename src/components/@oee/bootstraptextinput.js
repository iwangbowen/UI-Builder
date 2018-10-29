import { inputTypeNames } from '../inputTypes';
import { dataComponentId, formControl } from '../common';
import input from './input';
import { bootstraptextinputid } from './ids';
import { textinputProperties as properties } from '../properties/input';
import _ from 'lodash';

const bootstraptextinput = _.extend({}, input, {
    name: "Text Input",
    attributes: { "type": inputTypeNames },
    image: "icons/text_input.svg",
    html: `<input ${dataComponentId}="${bootstraptextinputid}" type="email" class="${formControl}">`,
    properties
});

export default bootstraptextinput;