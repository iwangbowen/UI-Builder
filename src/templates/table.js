import { dataTableId } from "../components/common";

let index = 1;

function template(node, table) {
    const id = node.attr('id') || (node.attr('id', `table${index++}`), node.attr('id'));
    const key = node.attr(dataTableId);
    return `
    var columnDefs${key} = [
        ${table.getTable(key).columnDefs.map(def => {
            return `{headerName: "${def.headerName}", field: "${def.field}", width: ${def.width ? def.width : '""'}}`;
        }).join(',')}
    ];
    var gridOptions${key} = {
        columnDefs: columnDefs${key},
        enableSorting: false,
        enableFilter: false
      };
    var eGridDiv${key} = document.querySelector('#${id}');
    new agGrid.Grid(eGridDiv${key}, gridOptions${key});
    gridOptions${key}.api.setRowData([]);
    `;
}

export default template;

