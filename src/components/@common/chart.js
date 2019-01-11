import extend from 'lodash/extend';
import { dataComponentId, configurableComponent, placeholderComponentHighlight } from '../common';
import { chartid } from './ids';
import dragHtmlComponent from './dragHtmlComponent';

const chart = extend({}, dragHtmlComponent, {
    name: "Chart",
    attributes: ["data-component-chartjs"],
    image: "icons/chart.svg",
    dragHtml: `<img ${dataComponentId}="${chartid}" src="libs/builder/icons/chart.svg" style="width: 75px; height: 75px;">`,
    html: `<div ${dataComponentId}="${chartid}" class="${configurableComponent} ${placeholderComponentHighlight}" style="width:100%; height:100%;">\
		   </div>`
});

export default chart;
