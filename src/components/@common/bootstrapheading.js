import basiccomponent from './basiccomponent';
import { headingProperties as properties } from '../properties/heading';
import _ from 'lodash';
import { cloneableComponent } from '../common';

const bootstrapheading = _.extend({}, basiccomponent, {
    image: "icons/heading.svg",
    name: "Heading",
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    html: `<h1 class="${cloneableComponent}">Heading</h1>`,
    properties
});

export default bootstrapheading;