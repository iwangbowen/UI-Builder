import { multivalueselectinputid } from './ids';
import autoselectinput from './autoselectinput';
import { dataComponentId, dataMultivalueSelectId } from '../common';
import _ from 'lodash';

const multivalueselectinput = _.extend({}, autoselectinput, {
    name: "Multi-value Select",
    html: `<div class="input-block">
            <select ${dataMultivalueSelectId} ${dataComponentId}="${multivalueselectinputid}" class="form-control js-example-basic-multiple" multiple="multiple">
            </select>
           </div>`,
});

export default multivalueselectinput;