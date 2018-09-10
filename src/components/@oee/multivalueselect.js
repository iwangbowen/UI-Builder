import { multivalueselectid } from './ids';
import autoselectinput from './autoselectinput';
import { dataComponentId, dataMultivalueSelectId } from '../common';

const multivalueselect = $.extend({}, autoselectinput, {
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