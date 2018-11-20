import { dataComponentId, configurableComponent, containerComponent } from '../common';
import { bootstraptableid } from './ids';
import { tableProperties as properties } from '../properties/table';
import bootstraptablehead from './bootstraptablehead';
import bootstraptablebody from './bootstraptablebody';

const bootstraptable = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Static Table",
    html: `<table class="table ${configurableComponent} ${containerComponent}" style="width: 200px;" ${dataComponentId}="${bootstraptableid}">
            ${bootstraptablehead.html}
            ${bootstraptablebody.html}
           </table>`,
    afterDrop(node) {
        return $(node).css({
            width: '100%'
        });
    },
    properties
};

export default bootstraptable;