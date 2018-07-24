import { ButtonInput, TextValueInput, SelectInput } from '../../inputs/inputs';
import { dataTableId, dataComponentId } from '../common';
import Vvveb from '../../builder';
import $ from '../../../js/jquery.min';

let index = 1;
const iframeWindow = document.getElementById('iframeId').contentWindow;
const columnDefs = 'columnDefs';
const gridOptions = 'gridOptions';

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
            const id = index++;
            $(node).attr(dataTableId, id);
            iframeWindow[getComputedProperty(node)] = {
                columnDefs: [
                    { headerName: "header", field: "filed", width: '' },
                    { headerName: "header", field: "field", width: '' },
                    { headerName: "header", field: "field", width: '' }
                ],
                enableSorting: false,
                enableFilter: false
            };
            new (document.getElementById('iframeId').contentWindow.agGrid).Grid(node, iframeWindow[getComputedProperty(node)]);
            iframeWindow[getComputedProperty(node)].api.setRowData([]);
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
                    width: cur.width
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
                options: [{
                    value: "Default",
                    text: ""
                }, {
                    value: "ag-theme-balham",
                    text: "Balham"
                }, {
                    value: "ag-theme-balham-dark",
                    text: "Balham (dark)"
                }, {
                    value: "ag-theme-blue",
                    text: "Blue"
                }, {
                    value: "ag-theme-bootstrap",
                    text: "Bootstrap"
                }, {
                    value: "ag-theme-dark",
                    text: "Dark"
                }, {
                    value: "ag-theme-fresh",
                    text: "Fresh"
                }, {
                    value: "ag-theme-material",
                    text: "Material"
                }]
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
                    width: ''
                });

                setColumnDefsAndRender(node, colDefs);
                return node;
            }
        }]
};

export {
    table, columnDefs, gridOptions, getComputedProperty
};