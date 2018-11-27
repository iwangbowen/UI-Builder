import { dataTableId, dataAutoSelectId, dataButtonId, dataRequiredSpan, dataCalendarId, dataMultivalueSelectId, inputBlockClass, sortableClass } from '../components/common';
import { multiSelectedClass, nonTemplateScriptType, generatedNonExecuteScriptClass } from '../constants';

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

const withCtrlKeyActionsSelector = '#select-actions #with-ctrl-key';
const withoutCtrlKeyActionsSelector = '#select-actions #without-ctrl-key';

const selectBox = '#select-box';

const userDefinedScriptSelector = 'script:not([class]):not([src])';
const generatedNonExecuteScriptSelector = `script.${generatedNonExecuteScriptClass}`;
const nonTemplateScriptSelector = `script[type='${nonTemplateScriptType}']`;

const componentSelector = '#components-list li ol li';

const sortableDivSelector = `div:not(.ui-sortable-placeholder).${sortableClass}`;

function getParentOrSelf(node) {
    const parents = $(node).parents(parentSelector);
    return parents.length ? parents[0] : node;
}

export {
    emptyChildrenSelectors, tableSelector, autoselectinputSelector, submitButtonSelector,
    parentSelector, getParentOrSelf, requiredSpanSelector, noneditableSelector, calendarSelector,
    calendarOnclickSelector, multivalueSelectSelector, multiSelectedSelector, selectBox,
    withCtrlKeyActionsSelector, withoutCtrlKeyActionsSelector, userDefinedScriptSelector,
    nonTemplateScriptSelector, componentSelector, inputBlockClassSelector, sortableDivSelector,
    generatedNonExecuteScriptSelector
};