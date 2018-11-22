import { dataComponentId } from "../common";
import { formbuttonid } from './ids';
import button from "./button";
import extend from 'lodash/extend';

const formbutton = extend({}, button, {
    name: "Form Button",
    html: `<button ${dataComponentId}=${formbuttonid} type="button" class="btn btn-primary draggable">Search</button>`,
});

export default formbutton;