import { configurableComponent } from "../common";
import { textProperty } from "../properties/properties";
import template from 'lodash/template';

const bootstraptablecell = {
    nodes: ["td"],
    name: "Table Cell",
    html: `<td class="${configurableComponent}"><%= text %></td>`,
    properties: [
        textProperty
    ]
};

const compiledTc = template(bootstraptablecell.html);

export {
    bootstraptablecell,
    compiledTc
};