import {grid} from '../util/grid';

function template() {
    return `
    var isInBuilder = false;
    ${grid.toString()}
    $(function () {
        grid();
    })`;
}

export default template;