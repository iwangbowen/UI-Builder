import { TextInput } from '../../inputs/inputs';
import { manualselectinputid } from './ids';
import { dataComponentId } from '../common';

const manualselectinput = {
    nodes: ["select"],
    name: "Manual Select Input",
    image: "icons/select_input.svg",
    html: `<div class="everyOutbox-right draggable">
            <div class="btn-group">
                <div class="dailyBox">
                    <select ${dataComponentId}="${manualselectinputid}" class="form-control" lustyle="height: 2.8rem;width:13rem">
                    </select>
                </div>
            </div>
           </div>
    `,
    properties: [{
        name: "Data Url",
        key: "dataUrl",
        htmlAttr: "data-url",
        inputtype: TextInput
    }]
};

export default manualselectinput;