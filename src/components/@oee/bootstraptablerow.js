import { configurableComponent } from '../common';
import { tableRowProperties as properties } from '../properties/table';
import _ from 'lodash';

const bootstraptablerow = {
    nodes: ["tr"],
    name: "Table Row",
    html: `<tr class="${configurableComponent}"><%= text %></tr>`,
    properties
};

const compiledTr = _.template(bootstraptablerow.html);

export {
    bootstraptablerow,
    compiledTr
};