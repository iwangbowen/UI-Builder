import { dataTableId, dataAutoSelectId, dataButtonId } from '../components/common';

const tableSelector = `[${dataTableId}]`;
const emptyChildrenSelectors = [tableSelector];
const autoselectinputSelector = `[${dataAutoSelectId}]`;
const submitButtonSelector = `button[${dataButtonId}]`;

export { emptyChildrenSelectors, tableSelector, autoselectinputSelector, submitButtonSelector };