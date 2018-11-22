import input from './input';
import extend from 'lodash/extend';
import { inputBlockClass, dataComponentId } from '../common';
import { fileinputid } from './ids';
import { fileinputProperties as properties } from '../properties/input';

const fileinput = extend({}, input, {
  name: 'File Input',
  attributes: { 'type': 'file' },
  image: 'icons/upload.svg',
  html: `<div class="${inputBlockClass}">
			    <input type="file" class="form-control-file" ${dataComponentId}="${fileinputid}">
         </div>`,
  properties
});

export default fileinput;