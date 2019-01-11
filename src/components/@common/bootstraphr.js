import extend from 'lodash/extend';
import { cloneableComponent, dataComponentId } from '../common';
import { bootstraphrid } from './ids';
import dragHtmlComponent from './dragHtmlComponent';

const bootstraphr = extend({}, dragHtmlComponent, {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    dragHtml: `<img ${dataComponentId}="${bootstraphrid}" src="libs/builder/icons/hr.svg" style="width: 100px; height: auto;">`,
    html: `<hr class="${cloneableComponent}">`
});

export default bootstraphr;