import { dataTableId, dataAutoSelectId } from '../components/common';

const tableSelector = `[${dataTableId}]`;
const emptyChildrenSelectors = [tableSelector];
const autoselectinputSelector = `[${dataAutoSelectId}]`;

export { emptyChildrenSelectors, tableSelector, autoselectinputSelector };