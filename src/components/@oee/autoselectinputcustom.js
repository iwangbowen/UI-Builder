import { autoselectinputid } from './ids';
import { dataComponentId, dataAutoSelectId } from '../common';
import input from './input';
import { autoselectProperties as properties } from '../properties/select';
import _ from 'lodash';

const autoselectinputcustom = _.extend({}, input, {
    nodes: ["select"],
    name: "Auto Select",
    image: "icons/select_input.svg",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${autoselectinputid}">
            <div class="btn-group">
                <div class="dailyBox">
                    <select ${dataAutoSelectId} ${dataComponentId}="${autoselectinputid}" class="form-control fundodooSelect" lustyle="height: 2.8rem;width:13rem">
                    </select>
                </div>
            </div>
           </div>
    `,
    properties
});

export default autoselectinputcustom;