import { configurableComponent } from '../common';
import { tableRowProperties as properties } from '../properties/table';
import template from 'lodash/template';

const bootstraptablerow = {
    nodes: ["tr"],
    name: "Table Row",
    html: `<tr class="${configurableComponent}"><%= text %></tr>`,
    properties
};

const compiledTr = template(bootstraptablerow.html);

export {
    bootstraptablerow,
    compiledTr
};