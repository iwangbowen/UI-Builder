import { options } from '../components/tooltip';

function template() {
    return `
    $(function () {
        $('input, select, textarea').tooltip(${JSON.stringify(options)});
    });
    `;
}

export default template;