import { ButtonInput, TextValueInput, SelectInput, TextInput, ToggleInput } from '../../inputs/inputs';
import { dataTableId, dataComponentId, dataResponseDataKey } from '../common';
import Vvveb from '../../gui/components';
import _ from 'lodash';
import TableHeaderMutation from '../../models/mutation/table-header-mutation';

const iframeWindow = document.getElementById('iframeId').contentWindow;
const columnDefs = 'columnDefs';
const gridOptions = 'gridOptions';
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
const dummyData = [
    {
        athelete: 'Michael Phelps',
        age: 23,
        country: 'United States'
    }, {
        athelete: 'Aleksey Nemov',
        age: 24,
        country: 'Russia'
    }, {
        athelete: 'Alicia Coutts',
        age: 24,
        country: 'Australia'
    }, {
        athelete: 'Cindy Klassen',
        age: 26,
        country: 'Canada'
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
    getGridOptions(node).api.setColumnDefs(colDefs);
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

const table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Base ag-Grid",
    html: `<div style="width: 500px; height: 200px;" class="resize-drag ag-theme-blue horizontal-stripes"></div>`,
    beforeInit: function (node) {
        $(node).removeClass('horizontal-stripes');
        if (!$(node).attr(dataTableId)) {
            $(node).attr(dataTableId, new Date().getTime());
            setGridOptions(node,
                {
                    columnDefs: [
                        { headerName: "Athelete", field: "athelete", width: '', checkboxSelection: false, headerCheckboxSelection: false },
                        { headerName: "Age", field: "age", width: '', checkboxSelection: false, headerCheckboxSelection: false },
                        { headerName: "Country", field: "country", width: '', checkboxSelection: false, headerCheckboxSelection: false }
                    ],
                    rowSelection: 'multiple',
                    enableSorting: true,
                    enableFilter: false
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
    table, columnDefs, gridOptions, getGridOptionsIdentifier, themeOptions,
    setColumnDefsAndRender, getColumnDefs
};