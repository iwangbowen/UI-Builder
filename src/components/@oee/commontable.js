import { dataComponentId } from '../common';
import { table } from './table';
import { commontableid } from './ids';
import _ from 'lodash';

const commontable = _.extend({}, table, {
    name: "Common ag-Grid",
    html: `<div ${dataComponentId}="${commontableid}" style="width: 500px; height: 200px;" class="resize-drag draggable ag-theme-blue horizontal-stripes"></div>`
});

export default commontable;