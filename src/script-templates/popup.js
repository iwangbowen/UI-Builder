import { add, edit, batchDelete } from '../util/popup';

function template() {
    return `
        var isInBuilder = false;
        ${add.toString()}
        ${edit.toString()}
        ${batchDelete.toString()}
    `;
}

export default template;