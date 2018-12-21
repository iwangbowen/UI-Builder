import {
    dataComponentId, inputBlockClass, radioCheckboxBlockClass,
    cloneableComponent, deletableComponent, inputAlignStyle
} from '../common';
import { radioid } from './ids';
import input from './input';
import { customRadioProperties as properties } from '../properties/input';
import extend from 'lodash/extend';

const radio = extend({}, input, {
    name: "Radio",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div class="${inputBlockClass}" style="${inputAlignStyle}">
                <div ${dataComponentId}="${radioid}" class="${radioCheckboxBlockClass} ${cloneableComponent} ${deletableComponent}">
                    <input class="radioInput" type="radio" value="" />
                    <span>Option</span>
                </div>
            </div>`,
    properties
});

export default radio;