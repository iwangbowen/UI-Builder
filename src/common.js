const gridItemSelector = 'div.gridster > div';
const formGridSelector =  `${gridItemSelector} form`;
const formGridRowSelector = `${formGridSelector} div.row`;
const formGridColumnSelector = `${formGridSelector} div.row > div`;
const gridColumnSelector = `${gridItemSelector} > div.row > div`;
const combinedSelector = `${gridItemSelector}, ${formGridSelector}, ${formGridColumnSelector}, ${gridColumnSelector}`;

const formItemsScope = 'formItems';
const gridColumnItemsScope = 'gridColumnItems';
const formGridColumnItemsScope = 'formGridColumnItems';
const popupFormItemsScope = 'popupFormItems';
const customTablesScope = 'customTables';
const gridDroppablesScope = 'gridDroppables';

export {
    gridItemSelector,
    formGridSelector,
    formGridColumnSelector,
    gridColumnSelector,
    combinedSelector,
    formItemsScope,
    gridColumnItemsScope,
    formGridColumnItemsScope,
    popupFormItemsScope,
    customTablesScope,
    gridDroppablesScope
};