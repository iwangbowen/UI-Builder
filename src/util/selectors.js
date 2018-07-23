import { dataTableId, dataCommonTableId, dataAutoSelectId, dataButtonId } from '../components/common';
import $ from '../../js/jquery.min';

const tableSelector = `[${dataTableId}][${dataCommonTableId}]`;
const emptyChildrenSelectors = [tableSelector];
const autoselectinputSelector = `[${dataAutoSelectId}]`;
const submitButtonSelector = `button[${dataButtonId}]`;
const parentSelector = [tableSelector].join(', ');

function getParentOrSelf(node) {
    const parents = $(node).parents(parentSelector);
    return parents.length ? parents[0] : node;
}

export {
    emptyChildrenSelectors, tableSelector, autoselectinputSelector, submitButtonSelector,
    parentSelector, getParentOrSelf
};