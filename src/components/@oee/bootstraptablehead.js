import { compiledThc } from './bootstraptableheadercell';
import { configurableComponent } from '../common';
import { compiledTr } from './bootstraptablerow';
import { tableHeadProperties as properties } from '../properties/table';

const bootstraptablehead = {
    nodes: ["thead"],
    name: "Table Head",
    html: `<thead class="${configurableComponent}">
        ${
        compiledTr({
            text: ['#', 'First Name', 'Last Name', 'Email'].map(v => compiledThc({
                text: v
            })).join('')
        })}
           </thead>`,
    properties
};

export default bootstraptablehead;