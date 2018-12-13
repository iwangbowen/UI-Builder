import basiccomponent from './basiccomponent';
import extend from 'lodash/extend';
import { dataComponentId, configurableComponent, placeholderComponentHighlight } from '../common';
import { chartid } from './ids';

const chart = extend({}, basiccomponent, {
    name: "Chart",
    attributes: ["data-component-chartjs"],
    image: "icons/chart.svg",
    dragHtml: `<img ${dataComponentId}="${chartid}" src="libs/builder/icons/chart.svg" style="width: 100px; height: auto;">`,
    html: `<div ${dataComponentId}="${chartid}" class="${configurableComponent} ${placeholderComponentHighlight}" style="width:100%; height:100%;">\
		   </div>`,
    getDropHtml() {
        return this.html;
    }
});

export default chart;
