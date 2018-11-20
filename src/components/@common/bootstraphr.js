import basiccomponent from './basiccomponent';
import _ from 'lodash';
import { cloneableComponent } from '../common';

const bootstraphr = _.extend({}, basiccomponent, {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    html: `<hr class="${cloneableComponent}">`
});

export default bootstraphr;