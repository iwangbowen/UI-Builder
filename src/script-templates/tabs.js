import { dataComponentId } from '../components/common';
import { tabsid } from '../components/@common/ids';

export function template() {
    return `
    $('[${dataComponentId}="${tabsid}"]').tabs();
    `;
}

export const tabsScriptType = 'tabs-script';