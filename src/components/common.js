const bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"];

const bgcolorSelectOptions =
    [{
        value: "Default",
        text: ""
    },
    {
        value: "bg-primary",
        text: "Primary"
    }, {
        value: "bg-secondary",
        text: "Secondary"
    }, {
        value: "bg-success",
        text: "Success"
    }, {
        value: "bg-danger",
        text: "Danger"
    }, {
        value: "bg-warning",
        text: "Warning"
    }, {
        value: "bg-info",
        text: "Info"
    }, {
        value: "bg-light",
        text: "Light"
    }, {
        value: "bg-dark",
        text: "Dark"
    }, {
        value: "bg-white",
        text: "White"
    }];

function changeNodeName(node, newNodeName) {
    const newNode = document.createElement(newNodeName);
    const attributes = node.get(0).attributes;
    for (i = 0, len = attributes.length; i < len; i++) {
        newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
    }
    $(newNode).append($(node).contents());
    $(node).replaceWith(newNode);
    return newNode;
}

let base_sort = 100;//start sorting for base component from 100 to allow extended properties to be first
function inc_base_sort() {
    return base_sort++;
}

const draggableComponent = 'draggable-component';
const configurableComponent = 'configurable-component';
const gridrowComponent = 'gridrow-component';
const cloneableComponent = 'cloneable-component';
const deletableComponent = 'deletable-component';
const containerComponent = 'container-component';
const dataComponentId = 'data-component-id';
const dataTableId = 'data-table-id';
const dataRelatedTable = 'data-related-table';
const dataCommonTableId = 'data-common-table-id';
const dataCalendarId = 'data-calendar-id';
const dataConfigInfo = 'data-config-info';
const dataAutoSelectId = 'data-auto-select-id';
const dataButtonId = 'data-button-id';
const dataUrl = 'data-url';
const dataRelatedButton = 'data-related-button';
const dataValueMapping = 'data-value-mapping';
const dataTextMapping = 'data-text-mapping';
const dataMultivalueSelectId = 'data-multi-value-select-id';
const dataRequiredSpan = 'data-required-span-id';
const dataResponseDataKey = 'data-response-data-key';
const dataOnclickFunctionGenerated = 'data-onclick-functioin-generated';
const dataTitle = 'data-title';
const dataRowField = 'data-row-field';
const dataRowClickUrl = 'data-row-click-url';
const dataCellClickUrl = 'data-cell-click-url';
const dataEnableRowClick = 'data-enable-row-click';
const dataEnableCellClick = 'data-enable-cell-click';
const dataKeyMapping = 'data-key-mapping';
const dataImageFormat = 'data-image-format';
const dataImagePlaceholder = 'data-image-placeholder';
const dataAgGridTranspose = 'data-ag-grid-transpose';
const dataAgGridTransposeKey = 'data-ag-grid-transpose-key';
const dataEnableButtonClickPopup = 'data-enable-button-click-popup';
const dataButtonKey = 'data-button-key';

const rowClickedPopupPrefix = 'row_clicked_popup';
const buttonClickedPopupPrefix = 'button_clicked_popup';
const cellClickedPopupPrefix = 'cell_clicked_popup';

const sortableClass = 'sortable';

const col_sm_1 = 'col-sm-1';
const col_sm_2 = 'col-sm-2';
const col_sm_3 = 'col-sm-3';
const col_sm_4 = 'col-sm-4';
const col_sm_5 = 'col-sm-5';
const col_sm_6 = 'col-sm-6';
const col_sm_7 = 'col-sm-7';
const col_sm_8 = 'col-sm-8';
const col_sm_9 = 'col-sm-9';
const col_sm_10 = 'col-sm-10';
const col_sm_11 = 'col-sm-11';
const col_sm_12 = 'col-sm-12';

const rowClass = 'row';
const formItemClass = 'form-item';
const inputBlockClass = 'input-block';
const radioCheckboxBlockClass = 'radio-checkbox-block';
const formBorderClass = 'form-border';
const dashBorderClass = 'dashed-border';
const formGroup = 'form-group';
const formControl = 'form-control';
const formControlFile = 'form-control-file';
const formCheck = 'form-check';
const formCheckInline = 'form-check-inline';
const formCheckInput = 'form-check-input';
const formCheckLabel = 'form-check-label';
const formText = 'form-text';
const textMuted = 'text-muted';
const btnBlock = 'btn-block';
const customControl = 'custom-control';
const customCheckbox = 'custom-checkbox';
const customControlInput = 'custom-control-input';
const customControlLabel = 'custom-control-label';
const customFile = 'custom-file';
const customFileInput = 'custom-file-input';
const customFileLabel = 'custom-file-label';

const colReg = /col-([^-\$ ]*)?-?(\d+)/g;
const headingReg = /H(\d)/;

export {
    bgcolorClasses, bgcolorSelectOptions, changeNodeName, inc_base_sort, dataComponentId, dataTableId,
    dataConfigInfo, dataCalendarId, dataUrl, dataAutoSelectId, dataButtonId, dataValueMapping, dataTextMapping,
    dataCommonTableId, dataMultivalueSelectId, dataRequiredSpan, dataResponseDataKey, dataOnclickFunctionGenerated,
    draggableComponent, dataTitle, configurableComponent, sortableClass, dataRowField, dataRelatedButton,
    formItemClass, inputBlockClass, radioCheckboxBlockClass, cloneableComponent, deletableComponent,
    dataRelatedTable, gridrowComponent, formBorderClass, colReg, dashBorderClass, formGroup,
    formControl, formControlFile, formCheck, formCheckInput, formCheckLabel, formText,
    textMuted, formCheckInline, btnBlock, headingReg, customControl, customCheckbox, customControlInput,
    customControlLabel, customFile, customFileInput, customFileLabel, containerComponent,
    dataRowClickUrl, dataCellClickUrl, dataEnableRowClick, dataEnableCellClick, dataKeyMapping, dataImageFormat, dataImagePlaceholder,
    rowClickedPopupPrefix, dataAgGridTranspose, dataAgGridTransposeKey, rowClass, col_sm_1,
    col_sm_2, col_sm_3, col_sm_4, col_sm_5, col_sm_6, col_sm_7, col_sm_8, col_sm_9,
    col_sm_10, col_sm_11, col_sm_12, dataEnableButtonClickPopup, buttonClickedPopupPrefix,
    dataButtonKey, cellClickedPopupPrefix
};
