import { ButtonInput, TextValueInput, SelectInput } from '../../inputs/inputs';
import { dataTableId, dataComponentId } from '../common';
import Vvveb from '../../builder';
import $ from '../../../js/jquery.min';

const iframeWindow = document.getElementById('iframeId').contentWindow;
const columnDefs = 'columnDefs';
const gridOptions = 'gridOptions';
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
const dummyData = [{
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

function getComputedProperty(node) {
    return `${gridOptions}${$(node).attr(dataTableId)}`;
}

function setColumnDefsAndRender(node, colDefs) {
    // Call to set new column definitions into the grid. 
    // The grid will redraw all the column headers, and then redraw all of the rows.
    iframeWindow[getComputedProperty(node)].api.setColumnDefs(colDefs);
    Vvveb.Components.render($(node).attr(dataComponentId));
}

const table = {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Base ag-Grid",
    html: `<div style="width: 500px; height: 200px;" class="draggable ag-theme-blue horizontal-stripes"></div>`,
    beforeInit: function (node) {
        $(node).removeClass('horizontal-stripes');
        if (!$(node).attr(dataTableId)) {
            $(node).attr(dataTableId, new Date().getTime());
            iframeWindow[getComputedProperty(node)] = {
                columnDefs: [
                    { headerName: "Athelete", field: "athelete", width: '', checkboxSelection: true, headerCheckboxSelection: true },
                    { headerName: "Age", field: "age", width: '', checkboxSelection: false, headerCheckboxSelection: false },
                    { headerName: "Country", field: "country", width: '', checkboxSelection: false, headerCheckboxSelection: false }
                ],
                rowSelection: 'multiple',
                enableSorting: true,
                enableFilter: false
            };
            new (document.getElementById('iframeId').contentWindow.agGrid).Grid(node, iframeWindow[getComputedProperty(node)]);
            iframeWindow[getComputedProperty(node)].api.setRowData(dummyData);
        }
        let i = 0;
        const properties = iframeWindow[getComputedProperty(node)].columnDefs.reduce((prev, cur) => {
            i++;
            prev.push({
                name: "Header " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: this,
                inputtype: TextValueInput,
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
                    let colDefs = iframeWindow[getComputedProperty(node)].columnDefs;
                    if (input.nodeName == 'BUTTON') {
                        colDefs = colDefs
                            .filter((value, index) => index != keyIndex);
                        iframeWindow[getComputedProperty(node)].columnDefs = colDefs;
                        setColumnDefsAndRender(node, colDefs);
                    } else {
                        if (input.name == 'width') {
                            colDefs[keyIndex][input.name] = value && parseInt(value);
                        } else if (input.name == 'checkboxSelection' || input.name == 'headerCheckboxSelection') {
                            colDefs[keyIndex][input.name] = value == 'true';
                        } else {
                            colDefs[keyIndex][input.name] = value;
                        }
                        // 重新渲染会失去输入框焦点，只需要用新的colDefs更新表格即可，右侧的部分不需要重新渲染。
                        iframeWindow[getComputedProperty(node)].api.setColumnDefs(colDefs);
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
            name: "Theme",
            key: "theme",
            htmlAttr: "class",
            validValues: ['ag-theme-balham-dark', 'ag-theme-balham', 'ag-theme-blue', 'ag-theme-bootstrap',
                'ag-theme-dark', 'ag-theme-fresh', 'ag-theme-material'],
            inputtype: SelectInput,
            onChange: function (node, value) {
                node.removeClass(this.validValues.join(" "));
                node.addClass(value);

                // Code copied form official site example https://www.ag-grid.com/example.php#/
                const gridOptions = iframeWindow[getComputedProperty(node)];
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
            name: "",
            key: "addChild",
            inputtype: ButtonInput,
            data: { text: "Add header" },
            onChange: function (node) {
                const colDefs = iframeWindow[getComputedProperty(node)].columnDefs;
                colDefs.push({
                    headerName: 'header',
                    field: 'field',
                    width: '',
                    checkboxSelection: false,
                    headerCheckboxSelection: false
                });

                setColumnDefsAndRender(node, colDefs);
                return node;
            }
        }]
};

export {
    table, columnDefs, gridOptions, getComputedProperty, themeOptions
};