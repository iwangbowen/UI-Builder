import { GridInput } from '../../inputs/inputs';
import { configurableComponent, dataComponentId, colReg, cloneableComponent } from '../common';
import { gridcolumnid } from './ids';

const gridcolumn = {
    name: "Grid Column",
    image: "icons/grid_row.svg",
    classesRegex: ["col-"],
    html: `<div class="col-sm-4 ${configurableComponent} ${cloneableComponent}" ${dataComponentId}="${gridcolumnid}" style="min-height: 50px;"></div>`,
    sortable: true,
    droppable: true,
    properties: [{
        name: "Column",
        key: "column",
        inputtype: new GridInput(),
        data: { hide_remove: true },
        beforeInit: function (node) {
            const _class = $(node).attr("class");
            let match;
            while ((match = colReg.exec(_class)) != null) {
                this.data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
            }
        },
        onChange: function (node, value, input) {
            let _class = node.attr("class");
            //remove previous breakpoint column size
            _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
            //add new column size
            if (value) _class += ' ' + input.name + '-' + value;
            node.attr("class", _class);
            return node;
        },
    }]
};

export default gridcolumn;