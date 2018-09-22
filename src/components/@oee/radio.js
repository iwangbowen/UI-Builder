import {
    dataComponentId, inputBlockClass, radioInputBlockClass,
    cloneableComponent, deletableComponent
} from '../common';
import { radioid } from './ids';
import input from './input';
import { radioProperties as properties } from '../input';
import _ from 'lodash';

const radio = _.extend({}, input, {
    name: "Radio",
    attributes: { "type": "radio" },
    image: "icons/radio.svg",
    html: `<div class="${inputBlockClass}">
                <div ${dataComponentId}="${radioid}" class="${radioInputBlockClass} ${cloneableComponent} ${deletableComponent}">
                    <input class="radioInput" type="radio" value="" />
                    <span>Radio</span>
                </div>
            </div>`,
    properties
});

export default radio;