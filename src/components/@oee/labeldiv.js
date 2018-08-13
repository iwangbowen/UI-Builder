import { dataComponentId } from '../common';
import { labeldivid, spanid } from './ids';

const labeldiv = {
    name: 'Label Div',
    image: 'icons/label.svg',
    dropzone: '.allButton-text.dropzone',
    html: `<div ${dataComponentId}="${labeldivid}" class="everyOutbox-left draggable">
                <i class="fa fa-caret-square-o-right text-danger" aria-hidden="true"></i>
                <span ${dataComponentId}="${spanid}" class="theme">Period</span>
           </div>`
};

export default labeldiv;