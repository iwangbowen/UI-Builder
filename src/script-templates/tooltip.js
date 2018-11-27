import { options } from '../components/tooltip';

export function template() {
    return `
    $(function () {
        $('input, select, textarea').tooltip(${JSON.stringify(options)});
    });
    `;
}

export const tooltipScriptType = 'tooltip-script';