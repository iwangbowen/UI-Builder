import { dataComponentId } from '../common';
import { spanid, labelfieldid } from './ids';
import basiccomponent from './basiccomponent';
import _ from 'lodash';

const labelfield = _.extend({}, basiccomponent, {
    name: 'Label Field',
    image: 'icons/label.svg',
    html: `<div ${dataComponentId}="${labelfieldid}">
                <span ${dataComponentId}="${spanid}">Name</span>：
                <span>Value</span>
           </div>`
});

export default labelfield;