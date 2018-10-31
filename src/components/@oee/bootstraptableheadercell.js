import { configurableComponent } from "../common";
import { textProperty } from "../properties/properties";
import _ from 'lodash';

const bootstraptableheadercell = {
    nodes: ["th"],
    name: "Table Header Cell",
    html: `<th class="${configurableComponent}"><%= text %></th>`,
    properties: [
        textProperty
    ]
};

const compiledThc = _.template(bootstraptableheadercell.html);

export {
    bootstraptableheadercell,
    compiledThc
};