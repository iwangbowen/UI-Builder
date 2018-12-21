import { dataComponentId, sortableClass } from '../common';
import { popuptextareaid } from './ids';
import extend from 'lodash/extend';
import textareainput from './textareainput';

const popuptextarea = extend({}, textareainput, {
    name: 'Popup Textarea',
    sortable: true,
    html: `<div class="everyInput ${sortableClass}" ${dataComponentId}="${popuptextareaid}">
            <span class="inputText">Label</span>
            <textarea ${dataComponentId}="${popuptextareaid}" value="" autocomplete="off">
            </textarea>
           </div>`
});

export default popuptextarea;