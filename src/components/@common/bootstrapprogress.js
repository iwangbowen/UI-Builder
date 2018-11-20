import { progressProperties as properties } from '../properties/progress';
import basiccomponent from './basiccomponent';
import _ from 'lodash';
import { cloneableComponent } from '../common';

const bootstrapprogress = _.extend({}, basiccomponent, {
    classes: ["progress"],
    name: "Progress Bar",
    image: "icons/progressbar.svg",
    html: `<div class="progress ${cloneableComponent}">
            <div class="progress-bar w-25"></div>
           </div>`,
    properties
});

export default bootstrapprogress;