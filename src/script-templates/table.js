import { dataTableId, dataRelatedTable } from '../components/common';
import { gridOptions, getGridOptionsIdentifier } from '../components/@oee/table';

function template(node) {
    const id = node.attr('id') || (node.attr('id', `table${node.attr(dataTableId)}`), node.attr('id'));
    const key = node.attr(dataTableId);
    return `
    var ${gridOptions}${key} = {
        columnDefs: ${JSON.stringify(document.getElementById('iframeId').contentWindow[getGridOptionsIdentifier(node)].columnDefs)},
        enableSorting: true,
        enableFilter: false,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        onRowClicked: function (event) {
        },
        onRowSelected: function (event) {
            if (event.node.isSelected() && eGridDiv${key}.attr('${dataRelatedTable}')) {
                if (window['gridOptions' + eGridDiv${key}.attr('${dataRelatedTable}')]) {
                    window['gridOptions' + eGridDiv${key}.attr('${dataRelatedTable}')]
                        .api.setRowData([event.data]);
                }
            }
        }
      };
    var eGridDiv${key} = $('#${id}');
    new agGrid.Grid(eGridDiv${key}.get(0), ${gridOptions}${key});
    ${gridOptions}${key}.api.setRowData([]);
    `;
}

export default template;
