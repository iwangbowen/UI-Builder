import { alertProperties as properties } from '../properties/alert';
import { dataComponentId, configurableComponent } from '../common';
import { bootstrapalertid } from './ids';
import extend from 'lodash/extend';
import dragHtmlComponent from './dragHtmlComponent';

const bootstrapalert = extend({}, dragHtmlComponent, {
  classes: ["alert"],
  name: "Alert",
  image: "icons/alert.svg",
  dragHtml: `<img ${dataComponentId}="${bootstrapalertid}" src="libs/builder/icons/alert.svg" style="width: 100px; height: 100px;">`,
  html: `<div ${dataComponentId}="${bootstrapalertid}" class="${configurableComponent} alert alert-warning alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <strong>Warning!</strong> <span>You should have a double check.<span>
  </div>`,
  properties
});

export default bootstrapalert;