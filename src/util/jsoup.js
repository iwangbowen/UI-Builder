import unusedTags from './unusedTags';
import { emptyChildrenSelectors, tableSelector, submitButtonSelector } from './selectors';
import tableTemplate from '../templates/table';
import autoselectinputTemplate from '../templates/autoselectinput';
import { template as submitFormTemplate } from '../templates/submitform';
import table from '../components/@oee/table';
import { calendarSelector, setOnclickAttr as setCalendarOnclickAttr } from './calendar';
import { setOnclickAttr as setButtonOnclickAttr } from './submitbutton';
import $ from '../../js/jquery.min';
import uglify from 'uglifyjs-browser';

const alwaysTrue = () => true;

// this refers to html element
function removeTag({ name, init, filter = alwaysTrue }) {
    let data;
    init && (data = init(this));
    Array.from(this.getElementsByTagName(name))
        .filter(filter.bind(data))
        .forEach(tag => tag.parentNode.removeChild(tag));
}

function removeUnusedTags(el) {
    unusedTags.forEach(removeTag, el);
    return el;
}

function emptyChildren(el) {
    $(el).find(emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function generateTableScript(el) {
    const jsStr = Array.from($(el).find(tableSelector)).reduce((prev, element) => {
        return `${prev}
                ${tableTemplate($(element), table)}`;
    }, '');
    return appendScript(el, jsStr);
}

function generateCalendarOnclickAttr(el) {
    $(el).find(calendarSelector).each(function () {
        $(this).attr('onclick') || setCalendarOnclickAttr(this);
    });
    return el;
}

function generateSelectOptionsScript(el) {
    return appendScript(el, autoselectinputTemplate());
}

function generateSubmitFormScript(el) {
    return appendScript(el, submitFormTemplate());
}

function generateButtonOnclickAttr(el) {
    $(el).find(submitButtonSelector).each(function () {
        $(this).attr('onclick') || setButtonOnclickAttr(this);
    });
    return el;
}

function concatContent(prev, cur) {
    return prev.then(prevContent =>
        cur.then(curContent => `
            ${prevContent}
            ${curContent}
        `)
    );
}

function appendScript(el, jsStr) {
    jsStr && $('<script></script>').text(jsStr).appendTo($(el).find('body'));
    return el;
}

function appendStylesheet(el, styleStr) {
    styleStr && $('<style></style>').text(styleStr).insertBefore($(el).find('body'));
    return el;
}

function constructURL(el) {
    const uri = el.tagName == 'LINK' ? 'href' : 'src';
    return new URL($(el).attr(uri), new URL($('#iframeId').attr('src'), el.baseURI)).toString();
}

function getExternalContent(tag) {
    return $.ajax({
        url: constructURL(tag)
    });
}

function minify(code) {
    return uglify.minify(code, {
        compress: true,
        output: {
            beautify: false,
            indent_level: 0
        }
    }).code;
}

function getScriptContent(script) {
    if ($(script).attr('src')) {
        return getExternalContent(script);
    } else {
        return Promise.resolve($(script).text());
    }
}

function replaceWithExternalScript(el) {
    return [...$(el).find('script')]
        .map(getScriptContent)
        .reduce(concatContent, Promise.resolve(''))
        .then(content => {
            $(el).find('script').remove();
            return appendScript(el, content);
        });
}

function replaceWithExternalStylesheet(el) {
    return [...$(el).find('link[rel=stylesheet]')]
        .map(getExternalContent)
        .reduce(concatContent, Promise.resolve(''))
        .then(content => {
            $(el).find('link[rel=stylesheet]').remove();
            return appendStylesheet(el, content);
        });
}

function replaceWithExternalFiles(html) {
    const el = document.createElement('html');
    el.innerHTML = html;
    return Promise.all([replaceWithExternalStylesheet(el), replaceWithExternalScript(el)])
        .then(() => $(el).prop('outerHTML'));
}

const beautify_options = {
    preserve_newlines: false,
    indent_inner_html: true,
    unformatted: []
}

export {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript, generateButtonOnclickAttr,
    replaceWithExternalFiles, beautify_options
};