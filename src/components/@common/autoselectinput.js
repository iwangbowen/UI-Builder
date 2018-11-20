import { autoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId } from '../common';
import input from './input';
import { autoselectProperties as properties } from '../properties/select';
import _ from 'lodash';

const autoselectinput = _.extend({}, input, {
    nodes: ["select"],
    name: "Auto Select",
    image: "icons/select_input.svg",
    html: `<div class="input-block">
            <select ${dataAutoSelectId} ${dataComponentId}="${autoselectinputid}" class="form-control">
            </select>
           </div>`,
    properties
});

export default autoselectinput;