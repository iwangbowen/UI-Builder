import $ from '../../js/jquery.min';
import _ from 'lodash';

function htmlGenerator(html, ...fns) {
    _.startsWith(html, '<!DOCTYPE') && (html = `<!DOCTYPE html>${html}`);
    const el = document.createElement('html');
    el.innerHTML = html;
    return $(fns.reduce((el, fn) => fn(el), el)).prop('outerHTML');
}

export default htmlGenerator;