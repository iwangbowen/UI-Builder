import { dataComponentId } from '../common';
import { table } from './table';
import { commontableid } from './ids';
import _ from 'lodash';

const commontable = _.extend({}, table, {
    name: "Common ag-Grid",
    html: `<div ${dataComponentId}="${commontableid}" style="width: 200px; height: 100px;" class="resize-drag draggable ag-theme-blue horizontal-stripes"></div>`
});

export default commontable;