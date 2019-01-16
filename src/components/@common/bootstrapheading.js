import { headingProperties as properties } from '../properties/heading';
import extend from 'lodash/extend';
import { cloneableComponent, dataComponentId, draggableComponent } from '../common';
import { bootstrapheadingid } from './ids';
import dragHtmlComponent from './dragHtmlComponent';

const bootstrapheading = extend({}, dragHtmlComponent, {
    image: "icons/heading.svg",
    name: "Heading",
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    dragHtml: `<img ${dataComponentId}="${bootstrapheadingid}" src="libs/builder/icons/heading.svg" style="width: 80px; height: 80px;">`,
    html: `<h1 ${dataComponentId}="${bootstrapheadingid}" class="${cloneableComponent} ${draggableComponent}">Heading</h1>`,
    properties
});

export default bootstrapheading;