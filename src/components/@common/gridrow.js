import { GridInput, ButtonInput } from '../../inputs/inputs';
import { gridrowid } from './ids';
import gridcolumn from './gridcolumn';
import { configurableComponent, gridrowComponent, dataComponentId, colReg } from '../common';
import { enableSortableAndDroppable } from '../../util/drag-n-drop';
import repeat from 'lodash/repeat';

const gridrow = {
    name: "Grid Row",
    image: "icons/grid_row.svg",
    classes: ["row"],
    html: `<div class="row ${configurableComponent} ${gridrowComponent}" ${dataComponentId}="${gridrowid}">
            ${repeat(gridcolumn.html, 3)}
           </div>`,
    height: 'auto',
    width: 'auto',
    childrenSortable: true,
    childrenDroppable: true,
    beforeInit: function (node) {
        const properties = [];
        let i = 0;
        $(node).children('[class*="col-"]').each(function () {
            let _class = $(this).attr("class");
            let match;
            const data = {};
            while ((match = colReg.exec(_class)) != null) {
                data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
            }
            i++;
            properties.push({
                name: "Column " + i,
                key: "column" + i,
                //index: i - 1,
                columnNode: this,
                inline: true,
                inputtype: new GridInput(),
                data: data,
                onChange: function (node, value, input) {
                    //column = $('[class*="col-"]:eq(' + this.index + ')', node);
                    const column = $(this.columnNode);
                    //if remove button is clicked remove column and render row properties
                    if (input.nodeName == 'BUTTON') {
                        column.remove();
                        Vvveb.Components.render(gridrowid);
                        return node;
                    }
                    //if select input then change column class
                    _class = column.attr("class");
                    //remove previous breakpoint column size
                    _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
                    //add new column size
                    if (value) _class += ' ' + input.name + '-' + value;
                    column.attr("class", _class);
                    return node;
                },
            });
        });
        //remove all column properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("column") === -1;
        });
        //add remaining properties to generated column properties
        properties.push(this.properties[0]);
        this.properties = properties;
        return node;
    },
    properties: [{
        name: "Column",
        key: "column1",
        inputtype: new GridInput()
    }, {
        name: "Column",
        key: "column1",
        inline: true,
        col: 12,
        inputtype: new GridInput()
    }, {
        name: "",
        key: "addChild",
        inputtype: new ButtonInput(),
        data: { text: "Add column" },
        onChange: function (node) {
            enableSortableAndDroppable($(gridcolumn.html).appendTo($(node)));
            //render component properties again to include the new column inputs
            Vvveb.Components.render(gridrowid);
            return node;
        }
    }]
};

export default gridrow;