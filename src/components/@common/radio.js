import {
    dataComponentId, inputBlockClass, radioCheckboxBlockClass,
    cloneableComponent, deletableComponent
} from '../common';
import { radioid } from './ids';
import input from './input';
import { customRadioProperties as properties } from '../properties/input';
import _ from 'lodash';

const radio = _.extend({}, input, {
    name: "Radio",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div class="${inputBlockClass}">
                <div ${dataComponentId}="${radioid}" class="${radioCheckboxBlockClass} ${cloneableComponent} ${deletableComponent}">
                    <input class="radioInput" type="radio" value="" />
                    <span>Option</span>
                </div>
            </div>`,
    properties
});

export default radio;