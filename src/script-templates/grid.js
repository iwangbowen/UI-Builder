import { initGridOutofBuilder } from '../util/grid';

export function template() {
    return `
    ${initGridOutofBuilder.toString()}
    $(function () {
        ${initGridOutofBuilder.name}();
    })`;
}

export const gridScriptType = 'grid-script';