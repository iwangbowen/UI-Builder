import { dataComponentId, configurableComponent, resizableComponent, scaleOnResizeComponent } from '../common';
import { table } from './table';
import { commontableid } from './ids';
import extend from 'lodash/extend';

const commontable = extend({}, table, {
    name: "Common ag-Grid",
    html: `<div ${dataComponentId}="${commontableid}" style="width: 500px; height: 300px;" class="${configurableComponent} ${resizableComponent} ${scaleOnResizeComponent} ag-theme-blue"></div>`
});

export default commontable;