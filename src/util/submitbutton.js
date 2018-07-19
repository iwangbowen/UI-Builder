import { functionName } from '../templates/submitform';
import $ from '../../js/jquery.min';

function setOnclickAttr(node) {
    return $(node).attr('onclick', `${functionName}(this)`);
}

export { setOnclickAttr };