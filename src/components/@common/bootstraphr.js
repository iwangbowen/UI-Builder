import basiccomponent from './basiccomponent';
import extend from 'lodash/extend';
import { cloneableComponent, dataComponentId } from '../common';
import { bootstraphrid } from './ids';

const bootstraphr = extend({}, basiccomponent, {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    dragHtml: `<img ${dataComponentId}="${bootstraphrid}" src="libs/builder/icons/hr.svg" style="width: 100px; height: auto;">`,
    html: `<hr class="${cloneableComponent}">`,
    getDropHtml() {
        return this.html;
    }
});

export default bootstraphr;