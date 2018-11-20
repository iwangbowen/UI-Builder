import { dataComponentId, sortableClass } from '../common';
import { popuptextinputid } from './ids';
import textinput from './textinput';
import _ from 'lodash';

const popuptextinput = _.extend({}, textinput, {
    name: 'Popup Text Input',
    sortable: true,
    html: `<div class="everyInput ${sortableClass}" ${dataComponentId}="${popuptextinputid}">
            <span class="inputText">Label</span>
            <input class="addInput" type="text" ${dataComponentId}="${popuptextinputid}" value="" autocomplete="off">
           </div>`
});

export default popuptextinput;