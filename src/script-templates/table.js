import { dataTableId } from '../components/common';
import { columnDefs, gridOptions, getGridOptionsIdentifier } from '../components/@oee/table';

function template(node) {
    const id = node.attr('id') || (node.attr('id', `table${node.attr(dataTableId)}`), node.attr('id'));
    const key = node.attr(dataTableId);
    return `
    var ${gridOptions}${key} = {
        columnDefs: ${JSON.stringify(document.getElementById('iframeId').contentWindow[getGridOptionsIdentifier(node)].columnDefs)},
        enableSorting: true,
        enableFilter: false,
        rowSelection: 'multiple',
      };
    var eGridDiv${key} = document.querySelector('#${id}');
    new agGrid.Grid(eGridDiv${key}, ${gridOptions}${key});
    ${gridOptions}${key}.api.setRowData([]);
    `;
}

export default template;
