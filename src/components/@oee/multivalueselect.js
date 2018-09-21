import { multivalueselectid } from './ids';
import autoselectinput from './autoselectinput';
import { dataComponentId, dataMultivalueSelectId } from '../common';
import _ from 'lodash';

const multivalueselect = _.extend({}, autoselectinput, {
    name: "Multi-value Select",
    html: `<div class="everyOutbox-right draggable" ${dataComponentId}="${multivalueselectid}">
            <div class="btn-group">
                <div class="dailyBox">
                    <select ${dataMultivalueSelectId} ${dataComponentId}="${multivalueselectid}" class="form-control fundodooSelect js-example-basic-multiple" multiple="multiple" lustyle="height: 2.8rem;width:13rem">
                    </select>
                </div>
            </div>
           </div>
    `,
});

export default multivalueselect;