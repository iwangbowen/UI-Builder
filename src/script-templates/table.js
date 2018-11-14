import { dataTableId, dataRelatedTable, dataEnableRowClick, dataRowClickUrl, rowClickedPopupPrefix } from '../components/common';
import { getGridOptionsIdentifier } from '../components/@oee/table';
import { gridOptions } from '../common';

function template(node) {
    const id = node.attr('id') || (node.attr('id', `table${node.attr(dataTableId)}`), node.attr('id'));
    const key = node.attr(dataTableId);
    return `
    var eGridDiv${key} = $('#${id}');
    var ${gridOptions}${key} = {
        columnDefs: ${JSON.stringify(document.getElementById('iframeId').contentWindow[getGridOptionsIdentifier(node)].columnDefs)},
        enableSorting: true,
        enableFilter: false,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        suppressFieldDotNotation: true,
        onRowClicked: function (event) {
            if (eGridDiv${key}.attr('${dataEnableRowClick}') == 'true') {
                popupDetail(eGridDiv${key}.attr('${dataRowClickUrl}'), event.data, $('#' + '${rowClickedPopupPrefix}' + '${key}'));
            }
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
    new agGrid.Grid(eGridDiv${key}.get(0), ${gridOptions}${key});
    ${gridOptions}${key}.api.setRowData([]);
    `;
}

export default template;
