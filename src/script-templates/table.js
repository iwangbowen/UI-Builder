import { dataTableId, dataRelatedTable, dataEnableRowClick, dataRowClickUrl, rowClickedPopupPrefix, dataEnableCellClick, dataCellClickUrl, cellClickedPopupPrefix } from '../components/common';
import { getGridOptionsIdentifier, pagination, paginationAutoPageSize, paginationPageSize } from '../components/@common/table';
import { gridOptions } from '../common';

function template(node) {
    const id = node.attr('id') || (node.attr('id', `table${node.attr(dataTableId)}`), node.attr('id'));
    const key = node.attr(dataTableId);
    const gridOptionsIdentifier = document.getElementById('iframeId').contentWindow[getGridOptionsIdentifier(node)];
    return `
    var eGridDiv${key} = $('#${id}');
    var ${gridOptions}${key} = {
        columnDefs: ${JSON.stringify(gridOptionsIdentifier.columnDefs)},
        enableSorting: true,
        enableFilter: false,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        suppressFieldDotNotation: true,
        ${pagination}: ${gridOptionsIdentifier[pagination]},
        ${paginationAutoPageSize}: ${gridOptionsIdentifier[paginationAutoPageSize]},
        ${paginationPageSize}: ${gridOptionsIdentifier[paginationPageSize]},
        onCellClicked: function (event) {
            if (eGridDiv${key}.attr('${dataEnableCellClick}') == 'true') {
                if (popupCommon && typeof popupCommon == 'function') {
                    var url = eGridDiv${key}.attr('${dataCellClickUrl}');
                    var popup = $('#' + '${cellClickedPopupPrefix}' + '${key}');
                    popupCommon(popup);
                }
            }
        },
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
