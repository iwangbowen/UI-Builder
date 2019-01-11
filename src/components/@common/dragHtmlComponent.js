import extend from 'lodash/extend';
import basiccomponent from './basiccomponent';

const dragHtmlComponent = extend({}, basiccomponent, {
    getDropHtml() {
        return this.html;
    }
});

export default dragHtmlComponent;