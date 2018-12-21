import { multivalueselectinputid } from './ids';
import autoselectinput from './autoselectinput';
import { dataComponentId, dataMultivalueSelectId, inputAlignStyle } from '../common';
import extend from 'lodash/extend';

const multivalueselectinput = extend({}, autoselectinput, {
    name: "Multi-value Select",
    html: `<div class="input-block" style="${inputAlignStyle}">
            <select ${dataMultivalueSelectId} ${dataComponentId}="${multivalueselectinputid}" class="form-control js-example-basic-multiple" multiple="multiple">
            </select>
           </div>`,
});

export default multivalueselectinput;