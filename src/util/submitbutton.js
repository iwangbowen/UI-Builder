import { functionName } from '../templates/submitform';

function setOnclickAttr(node) {
    return $(node).attr('onclick', `${functionName}(this)`);
}

export { setOnclickAttr };