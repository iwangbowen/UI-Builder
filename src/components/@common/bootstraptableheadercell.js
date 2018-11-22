import { configurableComponent } from "../common";
import { textProperty } from "../properties/properties";
import template from 'lodash/template';

const bootstraptableheadercell = {
    nodes: ["th"],
    name: "Table Header Cell",
    html: `<th class="${configurableComponent}"><%= text %></th>`,
    properties: [
        textProperty
    ]
};

const compiledThc = template(bootstraptableheadercell.html);

export {
    bootstraptableheadercell,
    compiledThc
};