import {
    dataComponentId, cloneableComponent, deletableComponent, formCheck, formCheckInput,
    formCheckLabel
} from '../common';
import { bootstrapradioid } from './ids';
import extend from 'lodash/extend';
import radio from './radio';
import {radioProperties as properties} from '../properties/input';

const bootstrapradio = extend({}, radio, {
    html: `<div class="${formCheck} ${cloneableComponent} ${deletableComponent}" ${dataComponentId}="${bootstrapradioid}">
            <input class="${formCheckInput}" type="radio" ${dataComponentId}="${bootstrapradioid}">
            <label class="${formCheckLabel}">Default radio</label>
           </div>`,
    properties
});

export default bootstrapradio;