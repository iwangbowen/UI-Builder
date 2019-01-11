import { dataComponentId } from '../common';
import { spanid, labelfieldid } from './ids';
import basiccomponent from './basiccomponent';
import extend from 'lodash/extend';

const labelfield = extend({}, basiccomponent, {
    name: 'Label Field',
    image: 'icons/label.svg',
    dragHtml: `<img ${dataComponentId}="${labelfieldid}" src="libs/builder/icons/label.svg" style="width: 100px; height: 100px;">`,
    html: `<div ${dataComponentId}="${labelfieldid}">
                <span ${dataComponentId}="${spanid}">Name</span>：
                <span>Value</span>
           </div>`,
    getDropHtml() {
        return this.html;
    }
});

export default labelfield;