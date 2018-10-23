import { initGridOutofBuilder } from '../util/grid';

function template() {
    return `
    ${initGridOutofBuilder.toString()}
    $(function () {
        ${initGridOutofBuilder.name}();
    })`;
}

export default template;