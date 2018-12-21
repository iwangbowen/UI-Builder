import {
    dataComponentId, cloneableComponent, deletableComponent, inputBlockClass,
    radioCheckboxBlockClass,
    inputAlignStyle
} from '../common';
import { checkboxid, spanid } from './ids';
import input from './input';
import { customCheckboxProperties as properties } from '../properties/input';
import extend from 'lodash/extend';

const checkbox = extend({}, input, {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.svg",
    html: `<div class="${inputBlockClass} " ${dataComponentId}="${checkboxid}" style="${inputAlignStyle}">
             <div class="${radioCheckboxBlockClass} ${cloneableComponent} ${deletableComponent}">
                <input ${dataComponentId}="${checkboxid}" type="checkbox" class="checkboxInput"/>
                <span ${dataComponentId}="${spanid}">Option</span>
             </div>
            </div>`,
    properties
});

export default checkbox;