import { dataComponentId } from "./components/common";
import { gridcolumnid } from "./components/@oee/ids";

const gridWidgetSelector = 'div.gridster > div';
const rowColumnSelector = `[${dataComponentId}="${gridcolumnid}"]`;
const gridFormSelector = `${gridWidgetSelector} form`;
const gridRowColumnSelector = `${gridWidgetSelector} ${rowColumnSelector}`;
const popupSelector = 'div.popup-window div.content, div.popup-window form.popup-form';
const popupRowColumnSelector = `div.popup-window div.content ${rowColumnSelector}, div.popup-window form.popup-form ${rowColumnSelector}`;
const gridSortableItemsSelector = `${gridFormSelector}, ${gridRowColumnSelector}`;
const gridItemsSelector = `${gridWidgetSelector}, ${gridFormSelector}, ${gridRowColumnSelector}`;
const popupItemsSelector = `${popupSelector}, ${popupRowColumnSelector}`;
const combinedSelector = `${gridSortableItemsSelector}, ${popupItemsSelector}`;

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

const isInBuilder = true;

const imagePlaceholder = '../../../../libs/builder/icons/image.svg';

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

const gridOptions = 'gridOptions';

export {
    gridWidgetSelector,
    combinedSelector,
    gridItemsSelector,
    gridSortableItemsSelector,
    rowColumnSelector,
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
    auxiliaryElementsSelector,
    isInBuilder,
    dummyData,
    gridOptions,
    imagePlaceholder
};