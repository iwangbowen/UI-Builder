const gridItemSelector = 'div.gridster > div';
const formGridSelector = `${gridItemSelector} form`;
const formGridRowSelector = `${formGridSelector} div.row`;
const formGridColumnSelector = `${formGridSelector} div.row > div`;
const gridColumnSelector = `${gridItemSelector} > div.row > div`;
const combinedSelector = `${formGridSelector}, ${formGridColumnSelector}, ${gridColumnSelector}`;

const formItemsScope = 'formItems';
const gridColumnItemsScope = 'gridColumnItems';
const formGridColumnItemsScope = 'formGridColumnItems';
const popupFormItemsScope = 'popupFormItems';
const customTablesScope = 'customTables';
const gridDroppablesScope = 'gridDroppables';

const selectBoxSelector = '#select-box';
const highlightBoxSelector = '#highlight-box';
const highlightNameSelector = '#highlight-name';
const wysiwygEditorSelector = '#wysiwyg-editor'
const auxiliaryElementsSelector = `${selectBoxSelector}, ${highlightBoxSelector}, ${highlightNameSelector}, ${wysiwygEditorSelector}`;

export {
    gridItemSelector,
    formGridSelector,
    formGridRowSelector,
    formGridColumnSelector,
    gridColumnSelector,
    combinedSelector,
    formItemsScope,
    gridColumnItemsScope,
    formGridColumnItemsScope,
    popupFormItemsScope,
    customTablesScope,
    gridDroppablesScope,
    selectBoxSelector,
    highlightBoxSelector,
    highlightNameSelector,
    wysiwygEditorSelector,
    auxiliaryElementsSelector
};