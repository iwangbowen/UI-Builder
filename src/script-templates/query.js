import { dataUrl, dataEnableButtonClickPopup } from '../components/common';

export function template() {
    return `
        function setAgGridData(grid, data) {
            var gridOptions = grid.gridOptions;
            var transposeKey = grid.transposeKey;
            var populateHeaders = grid.populateHeaders;
            if (populateHeaders) {
                if (data.length) {
                    var colDefs = Object.keys(data[0]).map(function (key) {
                        return {
                            headerName: key,
                            field: key
                        };
                    });
                    gridOptions.api.setColumnDefs(colDefs);
                    gridOptions.api.setRowData(data);
                }
            } else {
                if (transposeKey) {
                    var transposedData = gridOptions.columnDefs
                        .filter(function (colDef) {
                            return colDef.field !== transposeKey;
                        })
                        .map(function (colDef) {
                            var key = colDef.field;
                            var transposed = {};
                            transposed[transposeKey] = colDef.headerName;
                            data.forEach(function (item) {
                                transposed[item[transposeKey]] = item[key];
                            });
                            return transposed;
                        });
                    var newColDefs = [
                        {
                            headerName: '',
                            field: transposeKey,
                            cellStyle: {
                                'font-size': 'large'
                            },
                            pinned: 'left'
                        }
                    ].concat(data.map(function (item) {
                        return {
                            headerName: item[transposeKey],
                            field: $.isNumeric(item[transposeKey])
                                ? item[transposeKey].toString()
                                : item[transposeKey]
                        };
                    }));
                    gridOptions.api.setColumnDefs(newColDefs);
                    gridOptions.api.setRowData(transposedData);
                } else {
                    gridOptions.api.setRowData(data);
                }
            }
        }
        function query() {
            var queryForm = $(this).parents('form');
            var queryUrl = $(this).attr('${dataUrl}');
            submitForm(queryForm, queryUrl,
                function (response) {
                    if (Array.isArray(response.data)) {
                        if (grids.length) {
                            var grid = grids[0];
                            setAgGridData(grids[0], response.data);
                        }
                    } else {
                        $.each(response.data, function (key, value) {
                            $.each(grids, function (i, grid) {
                                if (grid.key == key) {
                                    setAgGridData(grid, value);
                                    return false;
                                }
                            });
                        });
                    }
                },
                function () {
                });
        }
        $('form button#dataSearch').on('click', query);
        $('div.gridster div form button[${dataEnableButtonClickPopup}!=true]').on('click', query);
    `;
}

export const queryScriptType = 'query-script';