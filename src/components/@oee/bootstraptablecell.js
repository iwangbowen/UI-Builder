import { configurableComponent } from "../common";
import { textProperty } from "../properties/properties";
import _ from 'lodash';

const bootstraptablecell = {
    nodes: ["td"],
    name: "Table Cell",
    html: `<td class="${configurableComponent}"><%= text %></td>`,
    properties: [
        textProperty
    ]
};

const compiledTc = _.template(bootstraptablecell.html);

export {
    bootstraptablecell,
    compiledTc
};