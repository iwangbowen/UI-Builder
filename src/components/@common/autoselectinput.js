import { autoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId, inputAlignStyle } from '../common';
import input from './input';
import { autoselectProperties as properties } from '../properties/select';
import extend from 'lodash/extend';

const autoselectinput = extend({}, input, {
    nodes: ["select"],
    name: "Auto Select",
    image: "icons/select_input.svg",
    html: `<div class="input-block" style="${inputAlignStyle}">
            <select ${dataAutoSelectId} ${dataComponentId}="${autoselectinputid}" class="form-control">
            </select>
           </div>`,
    properties
});

export default autoselectinput;