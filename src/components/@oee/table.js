import { ButtonInput, TextValueInput, SelectInput, TextInput, ToggleInput } from '../../inputs/inputs';
import { dataTableId, dataComponentId, dataResponseDataKey, dataRelatedTable, dataEnableRowClick, rowClickedPopupPrefix, dataAgGridTranspose, dataAgGridTransposeKey } from '../common';
import Vvveb from '../../gui/components';
import _ from 'lodash';
import TableHeaderMutation from '../../models/mutation/table-header-mutation';
import { tableSelector } from '../../util/selectors';
import { getRandomString } from '../../util/common';
import { dataRowClickUrlProperty, dataEnableRowClickProperty } from '../properties/properties';
import { dummyData, gridOptions } from '../../common';
import { enableSortableAndDroppableInIframe } from '../../util/drag-n-drop';

const iframeWindow = document.getElementById('iframeId').contentWindow;
const columnDefs = 'columnDefs';
const checkboxSelection = 'checkboxSelection';
const headerCheckboxSelection = 'headerCheckboxSelection';
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

function cloneRowClickedPopup(tableKey) {
    const cloned = Vvveb.Builder.frameBody
        .find('div#detail.popup-window')
        .clone()
        .attr('id', `${rowClickedPopupPrefix}${tableKey}`)
        .insertBefore(Vvveb.Builder.frameBody.find('script').first());
    enableSortableAndDroppableInIframe(cloned.find('div.content'));
    return cloned;
}

function deleteRowClickedPopup(tableKey) {
    return Vvveb.Builder.frameBody.remove(getRowClickedPopup(tableKey));
}

function getRowClickedPopup(tableKey) {
    return Vvveb.Builder.frameBody.find(`#${rowClickedPopupPrefix}${tableKey}`);
}

function rowClickedPopupExists(tableKey) {
    return !!getRowClickedPopup(tableKey).length;
}

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
    const colDefs = getColumnDefs(node);
    if (colDefs.length) {
        return getColumnDefProperty(colDefs[0], property);
    } else {
        return false;
    }
}

function setColumnDefProperty(colDef, property, value) {
    colDef[property] = value;
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
    const colDefs = getColumnDefs(node);
    if (colDefs.length) {
        setColumnDefProperty(colDefs[0], property, value == 'true');
        setColumnDefs(node);
    }
}

// Toggle Input对应的是checkbox，对应多个值
function transformToToggleValue(value) {
    return [value];
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
        if (!$(node).attr(dataTableId)) {
            $(node).attr(dataTableId, `_${getRandomString(2)}`);
            let popup;
            const tableKey = $(node).attr(dataTableId);
            if (!rowClickedPopupExists(tableKey)) {
                popup = cloneRowClickedPopup(tableKey);
            } else {
                popup = getRowClickedPopup(tableKey);
            }
            setGridOptions(node,
                {
                    columnDefs: [
                        { headerName: "Athelete", field: "athelete", width: '', checkboxSelection: true, headerCheckboxSelection: false, suppressMovable: true },
                        { headerName: "Age", field: "age", width: '', checkboxSelection: false, headerCheckboxSelection: false },
                        { headerName: "Country", field: "country", width: '', checkboxSelection: false, headerCheckboxSelection: false }
                    ],
                    rowSelection: 'multiple',
                    enableSorting: true,
                    enableFilter: false,
                    suppressRowClickSelection: true,
                    onRowClicked: function (event) {
                        if ($(node).attr(dataEnableRowClick) == 'true') {
                            iframeWindow.popupDetail(null, null, popup);
                        }
                    }
                });
            new (document.getElementById('iframeId').contentWindow.agGrid).Grid(node, getGridOptions(node));
            setRowData(node, dummyData);
        }
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
                    id: 'tableheader@oee',
                    headerName: cur.headerName,
                    field: cur.field,
                    width: cur.width,
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
            init: _.flow([_.curry(getCheckboxProperty)(_, checkboxSelection), transformToToggleValue]),
            onChange: _.partial(checkboxToggled, _, _, checkboxSelection)
        },
        {
            name: "Header Checkbox Selection",
            key: headerCheckboxSelection,
            inputtype: new ToggleInput(),
            data: {
                on: true,
                off: false
            },
            init: _.flow([_.curry(getCheckboxProperty)(_, headerCheckboxSelection), transformToToggleValue]),
            onChange: _.partial(checkboxToggled, _, _, headerCheckboxSelection)
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
            name: 'Transpose',
            key: _.camelCase(dataAgGridTranspose),
            htmlAttr: dataAgGridTranspose,
            inputtype: new ToggleInput(),
            validValues: ['true'],
            init(node) {
                return $(node).attr(dataAgGridTranspose) == 'true' ?
                    this.validValues : [];
            },
            onChange(node, value) {
                $(node).attr(dataAgGridTranspose, value);
                return node;
            },
            data: {
                on: 'true',
                off: 'false'
            }
        },
        {
            name: 'Transpose Key',
            key: _.camelCase(dataAgGridTransposeKey),
            htmlAttr: dataAgGridTransposeKey,
            inputtype: new SelectInput(),
            // Call beforeInit to initilize select input
            beforeInit(node) {
                this.data = {
                    options: getColumnDefs(node).map(colDef => ({
                        value: colDef.field,
                        text: colDef.headerName
                    }))
                };
            }
        },
        dataEnableRowClickProperty,
        dataRowClickUrlProperty,
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
    setColumnDefsAndRender, getColumnDefs
};