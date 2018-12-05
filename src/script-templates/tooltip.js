import { tooltipOptions } from '../components/tooltip';

export function template() {
    return `
$(function () {
    $('input, select, textarea').tooltip(${JSON.stringify(tooltipOptions)});
});`;
}

export const tooltipScriptType = 'tooltip-script';