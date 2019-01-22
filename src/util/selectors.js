import { dataTableId, dataAutoSelectId, dataButtonId, dataRequiredSpan, dataCalendarId, dataMultivalueSelectId, inputBlockClass, sortableClass } from '../components/common';
import { multiSelectedClass, nonTemplateScriptType, generatedNonExecuteScriptClass, generatedExecuteScriptClass } from '../constants';

const tableSelector = `[${dataTableId}]`;
const requiredSpanSelector = `[${dataRequiredSpan}]`;
const inputBlockClassSelector = `.${inputBlockClass}`;
const emptyChildrenSelectors = [tableSelector];
const autoselectinputSelector = `[${dataAutoSelectId}]`;
const submitButtonSelector = `button[${dataButtonId}]`;
const parentSelector = [tableSelector].join(', ');
const noneditableSelector = [tableSelector].join('');

const calendarSelector = `input[${dataCalendarId}]`;
const calendarOnclickSelector = `input[${dataCalendarId}][onclick]`;
const multivalueSelectSelector = `select[${dataMultivalueSelectId}]`;

const multiSelectedSelector = `.${multiSelectedClass}`;

const selectBox = '#select-box';
const selectActions = '#select-actions';
const withCtrlKeyActionsSelector = `${selectActions} #with-ctrl-key`;
const withoutCtrlKeyActionsSelector = `${selectActions} #without-ctrl-key`;

const userDefinedScriptSelector = 'script:not([class]):not([src])';
const generatedNonExecuteScriptSelector = `script.${generatedNonExecuteScriptClass}`;
const generatedExecuteScriptSelector = `script.${generatedExecuteScriptClass}`;
const nonTemplateScriptSelector = `script[type='${nonTemplateScriptType}']`;

const componentSelector = '#components-list li ol li';

const sortableDivSelector = `div:not(.ui-sortable-placeholder).${sortableClass}`;

export {
    emptyChildrenSelectors, tableSelector, autoselectinputSelector, submitButtonSelector,
    parentSelector, requiredSpanSelector, noneditableSelector, calendarSelector,
    calendarOnclickSelector, multivalueSelectSelector, multiSelectedSelector, selectBox,
    withCtrlKeyActionsSelector, withoutCtrlKeyActionsSelector, userDefinedScriptSelector,
    nonTemplateScriptSelector, componentSelector, inputBlockClassSelector, sortableDivSelector,
    generatedNonExecuteScriptSelector, generatedExecuteScriptSelector, selectActions
};