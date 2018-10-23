import { gridrowid } from './ids';
import gridcolumn from './gridcolumn';
import { configurableComponent, gridrowComponent, dataComponentId } from '../common';
import gridrow from './gridrow';
import _ from 'lodash';

const formgridrow = _.extend({}, gridrow, {
    name: "Form Grid Row",
    html: `<div class="row ${configurableComponent} ${gridrowComponent}" ${dataComponentId}="${gridrowid}">
            ${_.repeat(gridcolumn.html, 3)}
           </div>`,
});

export default formgridrow;