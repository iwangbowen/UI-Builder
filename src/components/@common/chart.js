import extend from 'lodash/extend';
import { dataComponentId, configurableComponent, placeholderComponentHighlight, defaultSizeStyle, dashedBorder, draggableComponent, resizableComponent, droppableComponent, scaleOnResizeComponent } from '../common';
import { chartid } from './ids';
import dragHtmlComponent from './dragHtmlComponent';

const chart = extend({}, dragHtmlComponent, {
    name: "Chart",
    attributes: ["data-component-chartjs"],
    image: "icons/chart.svg",
    dragHtml: `<img ${dataComponentId}="${chartid}" src="libs/builder/icons/chart.svg" style="width: 75px; height: 75px;">`,
    html: `<div ${dataComponentId}="${chartid}" class="${configurableComponent} ${dashedBorder} ${draggableComponent} ${resizableComponent} ${droppableComponent} ${scaleOnResizeComponent}" style="${defaultSizeStyle}">\
		   </div>`
});

export default chart;
