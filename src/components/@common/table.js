import { ButtonInput, TextValueInput, SelectInput, TextInput, ToggleInput, NumberInput } from '../../inputs/inputs';
import {
    dataTableId, dataComponentId, dataResponseDataKey, dataRelatedTable,
    dataEnableRowClick, rowClickedPopupPrefix, dataAgGridTransposeKey, dataEnableCellClick,
    cellClickedPopupPrefix, dataPopulateHeaders
} from '../common';
import Vvveb from '../../gui/components';
import flow from 'lodash/flow';
import curry from 'lodash/curry';
import partial from 'lodash/partial';
import camelCase from 'lodash/camelCase';
import TableHeaderMutation from '../../models/mutation/table-header-mutation';
import { tableSelector } from '../../util/selectors';
import { getRandomString } from '../../util/common';
import { dataRowClickUrlProperty, dataCellClickUrlProperty } from '../properties/properties';
import { dummyData, gridOptions } from '../../common';
import { createClickedPopup, clickedPopupExists, getClickedPopup } from '../../util/dom';

const iframeWindow = document.getElementById('iframeId').contentWindow;
const columnDefs = 'columnDefs';
const checkboxSelection = 'checkboxSelection';
const headerCheckboxSelection = 'headerCheckboxSelection';
const pagination = 'pagination';
const paginationAutoPageSize = 'paginationAutoPageSize';
const paginationPageSize = 'paginationPageSize';
const onCellClicked = 'onCellClicked';
const onRowClicked = 'onRowClicked';

const themeOptions = [
    {
        value: "ag-theme-balham",
        text: "Balham"
    },
    {
        value: "ag-theme-balham-dark",
        text: "Balham (dark)"
    },
    {
        value: "ag-theme-blue",
        text: "Blue"
    },
    {
        value: "ag-theme-bootstrap",
        text: "Bootstrap"
    },
    {
        value: "ag-theme-dark",
        text: "Dark"
    },
    {
        value: "ag-theme-fresh",
        text: "Fresh"
    },
    {
        value: "ag-theme-material",
        text: "Material"
    }];

function getGridOptionsIdentifier(node) {
    return `${gridOptions}${$(node).attr(dataTableId)}`;
}

function getGridOptions(node) {
    return iframeWindow[getGridOptionsIdentifier(node)];
}

function getColumnDefs(node) {
    return getGridOptions(node).columnDefs;
}

function getColumnDefProperty(colDef, property) {
    return colDef[property];
}

function getCheckboxProperty(node, property) {
    if (property == pagination || property == paginationAutoPageSize) {
        return getGridOptions(node)[property];
    } else {
        const colDefs = getColumnDefs(node);
        if (colDefs.length) {
            return getColumnDefProperty(colDefs[0], property);
        } else {
            return false;
        }
    }
}

function setColumnDefProperty(colDef, property, value) {
    colDef[property] = value;
}

function setGridOptionsProperty(node, property, value) {
    const gridOptions = getGridOptions(node);
    gridOptions[property] = value;
    setGridOptions(node, gridOptions);
}

function setColumnDefs(node, colDefs = getColumnDefs(node)) {
    getGridOptions(node).api.setColumnDefs(colDefs.map((colDef, i) => {
        // Make the first column undraggable.
        // The column property suppressMovable changes whether the column can be dragged.
        if (i == 0) {
            colDef.suppressMovable = true;
        } else {
            colDef.suppressMovable = false;
        }
        return colDef;
    }));
}

function setRowData(node, data) {
    getGridOptions(node).api.setRowData(data)
}

function setColumnDefsAndRender(node, colDefs) {
    // Call to set new column definitions into the grid.
    // The grid will redraw all the column headers, and then redraw all of the rows.
    getGridOptions(node).columnDefs = colDefs;
    setColumnDefs(node, colDefs);
    Vvveb.Components.render($(node).attr(dataComponentId));
}

function setGridOptions(node, gridOptions) {
    iframeWindow[getGridOptionsIdentifier(node)] = gridOptions;
}

function checkboxToggled(node, value, property) {
    if (property == pagination || property == paginationAutoPageSize) {
        setGridOptionsProperty(node, property, value == 'true');
    } else {
        const colDefs = getColumnDefs(node);
        if (colDefs.length) {
            setColumnDefProperty(colDefs[0], property, value == 'true');
            setColumnDefs(node);
        }
    }
}

// Toggle Input对应的是checkbox，对应多个值
function transformToToggleValue(value) {
    return [value];
}
// Refer to GitHub Repository https://github.com/LMFinney/ag-grid-partial
// for more information about transposing rows and columns in ag-grid
// Not necessary to transpose rows and columns in UI Builder
function transpose(node) {
    const colDefs = getColumnDefs(node);
    const transposeKey = $(node).attr(dataAgGridTransposeKey);
    const transposedData = colDefs
        .filter(colDef => colDef.field != transposeKey)
        .map((colDef) => {
            const key = colDef.field;
            const transposed = {};
            transposed[transposeKey] = colDef.headerName;
            dummyData.forEach(data => {
                transposed[data[transposeKey]] = data[key];
            });
            return transposed;
        });

    const newColDefs = [
        {
            headerName: '',
            field: transposeKey,
            cellStyle: {
                'font-size': 'large'
            },
            pinned: 'left'
        },
        ...dummyData.map(data => ({
            headerName: data[transposeKey],
            field: $.isNumeric(data[transposeKey])
                ? data[transposeKey].toString()
                : data[transposeKey]
        }))
    ];
    setColumnDefs(node, newColDefs)
    setRowData(node, transposedData);
}

function revertTranspose() {

}

// Don't remove row clicked detail popup element
// when table is removed or row click is disabled,
// so we don't bother to re-create detail popup element
// when users click redo button
// (if we do so, the elements you dropped inside the detail popup will be lost)
// or re-write exported onRowClicked callback
// when users upload pages to UI Builder
const table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Base ag-Grid",
    html: `<div style="width: 100px; height: 50px;" class="resize-drag ag-theme-blue horizontal-stripes"></div>`,
    afterDrop(node) {
        $(node).removeClass('horizontal-stripes');
    },
    beforeInit: function (node) {
        let tableKey = $(node).attr(dataTableId);

        function cellClickedCb(event) {
            if ($(node).attr(dataEnableCellClick) === 'true') {
                const popupId = `${cellClickedPopupPrefix}${$(node).attr(dataTableId)}`;
                iframeWindow.popupCommon(getClickedPopup(`#${popupId}`));
            }
        }

        function rowClickedCb(event) {
            if ($(node).attr(dataEnableRowClick) === 'true') {
                const popupId = `${rowClickedPopupPrefix}${$(node).attr(dataTableId)}`;
                iframeWindow.popupCommon(getClickedPopup(`#${popupId}`));
            }
        }

        if (!tableKey) {
            $(node).attr(dataTableId, `_${getRandomString(2)}`);
            tableKey = $(node).attr(dataTableId);

            setGridOptions(node,
                {
                    columnDefs: [
                        {
                            headerName: "Athelete",
                            field: "athelete", width: '',
                            checkboxSelection: true,
                            headerCheckboxSelection: false,
                            suppressMovable: true,
                            hide: false
                        },
                        {
                            headerName: "Age",
                            field: "age", width: '',
                            checkboxSelection: false,
                            headerCheckboxSelection: false,
                            hide: false
                        },
                        {
                            headerName: "Country",
                            field: "country", width: '',
                            checkboxSelection: false,
                            headerCheckboxSelection: false,
                            hide: false
                        }
                    ],
                    rowSelection: 'multiple',
                    enableSorting: true,
                    enableFilter: false,
                    suppressRowClickSelection: true,
                    pagination: false,
                    paginationAutoPageSize: false,
                    // https://github.com/ag-grid/ag-grid/issues/391
                    // If field name contains dot, treat it as literal dot instead of deep references
                    suppressFieldDotNotation: true,
                    onCellClicked: cellClickedCb,
                    onRowClicked: rowClickedCb
                });
            new (document.getElementById('iframeId').contentWindow.agGrid).Grid(node, getGridOptions(node));
            setRowData(node, dummyData);
        }
        // Replace user defined callback with the one defined in UI Builder
        setGridOptionsProperty(node, onCellClicked, cellClickedCb);
        setGridOptionsProperty(node, onRowClicked, rowClickedCb);

        let i = 0;
        const properties = getColumnDefs(node).reduce((prev, cur) => {
            i++;
            prev.push({
                name: "Header " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: this,
                inputtype: new TextValueInput(),
                data: {
                    id: 'tableheader@common',
                    headerName: cur.headerName,
                    field: cur.field,
                    width: cur.width,
                    hide: cur.hide === true ? ' checked' : '',
                    checkboxSelection: cur.checkboxSelection,
                    headerCheckboxSelection: cur.headerCheckboxSelection
                },
                onChange: function (node, value, input) {
                    const keyIndex = parseInt(this.key.substr('option'.length)) - 1;
                    let colDefs = getColumnDefs(node);
                    if (input.nodeName == 'BUTTON') {
                        Vvveb.Undo.addMutation(new TableHeaderMutation({
                            target: node,
                            addHeader: false,
                            index: keyIndex,
                            colDef: getColumnDefs(node)[keyIndex]
                        }));
                        colDefs = colDefs
                            .filter((value, index) => index != keyIndex);
                        setColumnDefsAndRender(node, colDefs);
                    } else {
                        if (input.name == 'width') {
                            colDefs[keyIndex][input.name] = value && parseInt(value);
                        } else if (input.name == 'hide') {
                            colDefs[keyIndex][input.name] = input.checked;
                        } else {
                            colDefs[keyIndex][input.name] = value;
                        }
                        // 重新渲染会失去输入框焦点，只需要用新的colDefs更新表格即可，右侧的部分不需要重新渲染。
                        setColumnDefs(node, colDefs);
                    }
                    return node;
                },
            });
            return prev;
        }, []);

        this.properties = this.properties.filter(property => property.key.indexOf("option") === -1);
        this.properties.unshift(...properties);

        return node;
    },
    properties: [
        {
            name: "Checkbox Selection",
            key: checkboxSelection,
            inputtype: new ToggleInput(),
            data: {
                on: true,
                off: false
            },
            // The _.curry.placeholder value,
            // which defaults to _ in monolithic builds,
            // may be used as a placeholder for provided arguments.
            // https://lodash.com/docs/4.17.11#curry
            init: flow([curry(getCheckboxProperty)(curry.placeholder, checkboxSelection), transformToToggleValue]),
            // The _.partial.placeholder value,
            // which defaults to _ in monolithic builds,
            // may be used as a placeholder for partially applied arguments.
            // https://lodash.com/docs/4.17.11#partial
            onChange: partial(checkboxToggled, partial.placeholder, partial.placeholder, checkboxSelection)
        },
        {
            name: "Header Checkbox Selection",
            key: headerCheckboxSelection,
            inputtype: new ToggleInput(),
            data: {
                on: true,
                off: false
            },
            init: flow([curry(getCheckboxProperty)(curry.placeholder, headerCheckboxSelection), transformToToggleValue]),
            onChange: partial(checkboxToggled, partial.placeholder, partial.placeholder, headerCheckboxSelection)
        },
        {
            name: 'Populate Headers',
            key: camelCase(dataPopulateHeaders),
            htmlAttr: dataPopulateHeaders,
            inputtype: new ToggleInput(),
            validValues: ['true'],
            init(node) {
                return $(node).attr(dataPopulateHeaders) === 'true' ?
                    this.validValues : [];
            },
            onChange(node, value) {
                $(node).attr(dataPopulateHeaders, value);
                return node;
            },
            data: {
                on: 'true',
                off: 'false'
            }
        },
        {
            name: 'Pagination',
            key: pagination,
            inputtype: new ToggleInput(),
            data: {
                on: true,
                off: false
            },
            init: flow([curry(getCheckboxProperty)(curry.placeholder, pagination), transformToToggleValue]),
            onChange: partial(checkboxToggled, partial.placeholder, partial.placeholder, pagination)
        },
        {
            name: 'Auto Page Size',
            key: paginationAutoPageSize,
            inputtype: new ToggleInput(),
            data: {
                on: true,
                off: false
            },
            init: flow([curry(getCheckboxProperty)(curry.placeholder, paginationAutoPageSize), transformToToggleValue]),
            onChange: partial(checkboxToggled, partial.placeholder, partial.placeholder, paginationAutoPageSize)
        },
        {
            name: 'Page Size',
            key: paginationPageSize,
            inputtype: new NumberInput(),
            init(node) {
                return getGridOptions(node)[paginationPageSize];
            },
            onChange(node, value) {
                setGridOptionsProperty(node, paginationPageSize, value);
            }
        },
        {
            name: "Theme",
            key: "theme",
            htmlAttr: "class",
            validValues: ['ag-theme-balham-dark', 'ag-theme-balham', 'ag-theme-blue', 'ag-theme-bootstrap',
                'ag-theme-dark', 'ag-theme-fresh', 'ag-theme-material'],
            inputtype: new SelectInput(),
            onChange: function (node, value) {
                node.removeClass(this.validValues.join(" "));
                node.addClass(value);
                // Code copied form official site example https://www.ag-grid.com/example.php#/
                const gridOptions = getGridOptions(node);
                gridOptions.api.resetRowHeights();
                gridOptions.api.redrawRows();
                gridOptions.api.refreshHeader();
                gridOptions.api.refreshToolPanel();
            },
            data: {
                options: themeOptions
            }
        },
        {
            name: 'Related Table',
            key: 'relatedTable',
            htmlAttr: dataRelatedTable,
            inputtype: new SelectInput(),
            beforeInit(node) {
                this.data = {
                    options: [...iframeWindow.$(tableSelector)]
                        .map(e => ({
                            value: $(e).attr(dataTableId),
                            text: $(e).attr(dataTableId)
                        }))
                        .filter(option => option.value != $(node).attr(dataTableId))
                };
            }
        },
        {
            name: 'Table Key',
            key: 'tableKey',
            htmlAttr: dataTableId,
            inputtype: new TextInput(),
            data: {
                readonly: true
            }
        },
        {
            name: 'Transpose Key',
            key: camelCase(dataAgGridTransposeKey),
            htmlAttr: dataAgGridTransposeKey,
            inputtype: new SelectInput(),
            // Call beforeInit to initilize select input
            beforeInit(node) {
                this.data = {
                    options: [
                        {
                            value: '',
                            text: 'No Transpose'
                        },
                        ...getColumnDefs(node).map(colDef => ({
                            value: colDef.field,
                            text: colDef.headerName
                        }))]
                };
            },
            onChange(node, value) {
                $(node).attr(dataAgGridTransposeKey, value);
                // if (value) {
                //     transpose(node);
                // } else {
                //     revertTranspose(node);
                // }
                return node;
            },
        },
        {
            name: 'Enable Row Click',
            key: camelCase(dataEnableRowClick),
            htmlAttr: dataEnableRowClick,
            inputtype: new ToggleInput(),
            validValues: ['true'],
            init(node) {
                return $(node).attr(dataEnableRowClick) == 'true' ?
                    this.validValues : [];
            },
            onChange(node, value) {
                const popupId = `${rowClickedPopupPrefix}${$(node).attr(dataTableId)}`;
                if (!clickedPopupExists(`#${popupId}`)) {
                    createClickedPopup(popupId);
                }

                $(node).attr(dataEnableRowClick, value);
                if (value === 'true') {
                    $(node).attr(dataEnableCellClick, 'false');
                }

                Vvveb.Components.render($(node).attr(dataComponentId));
                return node;
            },
            data: {
                on: 'true',
                off: 'false'
            }
        },
        dataRowClickUrlProperty,
        {
            name: 'Enable Cell Click',
            key: camelCase(dataEnableCellClick),
            htmlAttr: dataEnableCellClick,
            inputtype: new ToggleInput(),
            validValues: ['true'],
            init(node) {
                return $(node).attr(dataEnableCellClick) == 'true' ?
                    this.validValues : [];
            },
            onChange(node, value) {
                const popupId = `${cellClickedPopupPrefix}${$(node).attr(dataTableId)}`;
                if (!clickedPopupExists(`#${popupId}`)) {
                    createClickedPopup(popupId);
                }
                $(node).attr(dataEnableCellClick, value);
                if (value === 'true') {
                    $(node).attr(dataEnableRowClick, 'false');
                }

                Vvveb.Components.render($(node).attr(dataComponentId));
                return node;
            },
            data: {
                on: 'true',
                off: 'false'
            }
        },
        dataCellClickUrlProperty,
        {
            name: 'Data key',
            key: 'dataKey',
            htmlAttr: dataResponseDataKey,
            inputtype: new TextInput()
        },
        {
            name: "",
            key: "addChild",
            inputtype: new ButtonInput(),
            data: { text: "Add header" },
            onChange: function (node) {
                const colDefs = getColumnDefs(node);
                const colDef = {
                    headerName: 'header',
                    field: 'field',
                    width: '',
                    checkboxSelection: false,
                    headerCheckboxSelection: false
                };
                colDefs.push(colDef);
                Vvveb.Undo.addMutation(new TableHeaderMutation({
                    target: node,
                    addHeader: true,
                    colDef
                }));
                setColumnDefsAndRender(node, colDefs);
                return node;
            }
        }]
};

export {
    table, columnDefs, getGridOptionsIdentifier, themeOptions,
    setColumnDefsAndRender, getColumnDefs, pagination, paginationAutoPageSize,
    paginationPageSize, onCellClicked, onRowClicked
};