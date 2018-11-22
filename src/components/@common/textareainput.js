import { dataComponentId, inputBlockClass } from '../common';
import { textareaid } from './ids';
import input from './input';
import { commonProperties as properties } from '../properties/input';
import extend from 'lodash/extend';

const textareainput = extend({}, input, {
    nodes: [`textarea`],
    name: "Textarea",
    image: "icons/text_area.svg",
    html: `<div class="${inputBlockClass}">
            <textarea class="form-control" ${dataComponentId}="${textareaid}"></textarea>
           </div>`,
    properties
});

export default textareainput;