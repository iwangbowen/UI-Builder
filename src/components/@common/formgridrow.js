import { gridrowid } from './ids';
import gridcolumn from './gridcolumn';
import { configurableComponent, gridrowComponent, dataComponentId } from '../common';
import gridrow from './gridrow';
import extend from 'lodash/extend';
import repeat from 'lodash/repeat';

const formgridrow = extend({}, gridrow, {
    name: "Form Grid Row",
    html: `<div class="row ${configurableComponent} ${gridrowComponent}" ${dataComponentId}="${gridrowid}">
            ${repeat(gridcolumn.html, 3)}
           </div>`,
});

export default formgridrow;