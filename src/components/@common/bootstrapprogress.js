import { progressProperties as properties } from '../properties/progress';
import extend from 'lodash/extend';
import { cloneableComponent, draggableComponent } from '../common';
import dragHtmlComponent from './dragHtmlComponent';

const bootstrapprogress = extend({}, dragHtmlComponent, {
    classes: ["progress"],
    name: "Progress Bar",
    image: "icons/progressbar.svg",
    dragHtml: `<img class="progress" src="libs/builder/icons/progressbar.svg" style="width: 100px; height: 30px;">`,
    html: `<div class="progress ${cloneableComponent} ${draggableComponent}">
            <div class="progress-bar w-25"></div>
           </div>`,
    properties
});

export default bootstrapprogress;