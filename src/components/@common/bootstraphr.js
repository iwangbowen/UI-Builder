import basiccomponent from './basiccomponent';
import extend from 'lodash/extend';
import { cloneableComponent } from '../common';

const bootstraphr = extend({}, basiccomponent, {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    html: `<hr class="${cloneableComponent}">`
});

export default bootstraphr;