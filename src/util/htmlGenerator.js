import $ from '../../js/jquery.min';

function htmlGenerator(html, ...fns) {
    const el = document.createElement('html');
    el.innerHTML = html;
    fns.reduce((el, fn) => fn(el), el);
    return $(el).prop('outerHTML');
}

export default htmlGenerator;