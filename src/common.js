import { dataComponentId } from "./components/common";
import { gridcolumnid, tabsid } from "./components/@common/ids";

const gridWidgetSelector = 'div.gridster > div';
const rowColumnSelector = `[${dataComponentId}="${gridcolumnid}"]`;
const formSelector = 'form';
const gridFormSelector = `${gridWidgetSelector} form`;
const gridRowColumnSelector = `${gridWidgetSelector} ${rowColumnSelector}`;
const addOrEditPopupFormSelector = 'div.popup-window form.popup-form';
const popupSelector = `div.popup-window div.content, ${addOrEditPopupFormSelector}`;
const popupRowColumnSelector = `div.popup-window div.content ${rowColumnSelector}, ${addOrEditPopupFormSelector} ${rowColumnSelector}`;
const popupFormSelector = 'div.popup-window div.content form';
const gridSortableItemsSelector = `${gridFormSelector}, ${gridRowColumnSelector}`;
const gridItemsSelector = `${gridWidgetSelector}, ${gridFormSelector}, ${gridRowColumnSelector}`;
const popupItemsSelector = `${popupSelector}, ${popupRowColumnSelector}, ${popupFormSelector}`;
const pdsDroppableSelector = '.allButton.dropzone';
const tabSelector = `[${dataComponentId}="${tabsid}"] > div`;
const sortableAndDroppableSelector = `${gridSortableItemsSelector}, ${popupItemsSelector}, ${pdsDroppableSelector}, ${tabSelector}`;
const droppableSelector = `${gridItemsSelector}, ${popupItemsSelector}, ${pdsDroppableSelector}, ${tabSelector}`;

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

const detailPopup = `
    <div id="detail" class="popup-window" style="display: none;">
        <div class="content" style="width: 100%; height: 100%;"></div>
    </div>`;

function getDetailPopupSelector(popup) {
    return `#${popup.attr('id')} div.content`
}

const tooltipOptions = {
    position: {
        my: "left top",
        at: "right+5 top-5",
        collision: "none"
    }
};

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
    sortableAndDroppableSelector,
    gridItemsSelector,
    gridSortableItemsSelector,
    droppableSelector,
    rowColumnSelector,
    addOrEditPopupFormSelector,
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
    formSelector,
    isInBuilder,
    dummyData,
    gridOptions,
    imagePlaceholder,
    getDetailPopupSelector,
    detailPopup,
    tooltipOptions
};