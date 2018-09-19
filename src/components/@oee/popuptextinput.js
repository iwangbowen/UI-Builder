import { dataComponentId, sortableClass } from '../common';
import { popuptextinputid } from './ids';
import textinput from './textinput';

const popuptextinput = $.extend({}, textinput, {
    name: 'Popup Text Input',
    sortable: true,
    html: `<div class="everyInput ${sortableClass}" ${dataComponentId}="${popuptextinputid}">
            <div class="inputText">Label</div>
            <input class="addInput" type="text" onfocus="this.removeAttribute('readonly')" value="" autocomplete="off">
           </div>`
});

export default popuptextinput;