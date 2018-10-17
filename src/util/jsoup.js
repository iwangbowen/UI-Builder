import {
    emptyChildrenSelectors, tableSelector, submitButtonSelector, calendarSelector,
    multivalueSelectSelector
} from './selectors';
import tableTemplate from '../script-templates/table';
import autoselectinputTemplate from '../script-templates/autoselectinput';
import { template as submitFormTemplate, functionName } from '../script-templates/submitform';
import popupTemplate from '../script-templates/popup';
import queryTempate from '../script-templates/query';
import gridTemplate from '../script-templates/grid';
import multivalueselectTemplate from '../script-templates/multivalueselect';
import functionTemplate from '../script-templates/function';
import tooltipTemplate from '../script-templates/tooltip';
import { setOnclickAttr as setCalendarOnclickAttr } from './dataAttr';
import { setOnclickAttr as setButtonOnclickAttr } from './submitbutton';
import _ from 'lodash';
import { removeableScript, tableScript, appendableScript, reservedScript, dataScriptType, tooltipScriptType } from '../constants';
import { dataOnclickFunctionGenerated } from '../components/common';
import 'core-js/es6/array';
import 'core-js/es7/array';
import 'core-js/es6/string';

function removeRemoveableScripts(el) {
    $(el).find(`script[class=${removeableScript}]`).remove();
    return el;
}

function alwaysTrue() {
    return true;
}

// this refers to html element
function removeTag({ name, init, filter = alwaysTrue }) {
    let data;
    init && (data = init(this));
    Array.from(this.getElementsByTagName(name))
        .filter(filter.bind(data))
        .forEach(tag => tag.parentNode.removeChild(tag));
}

const unusedTags = [
    {
        name: 'script',
        filter: tag => tag.getAttribute('src')
            ? (tag.getAttribute('src').includes('iframe')
                || tag.getAttribute('src').includes('interact')
                // Remove layout.js in Builder
                || tag.getAttribute('src').includes('layout'))
            : $(tag).hasClass(removeableScript)
    },
    {
        name: 'style',
        filter: tag => tag.getAttribute('type') == 'text/css'
    },
    {
        name: 'link',
        init(el) {
            return _.chain([...$(el).find(tableSelector)])
                .flatMap(table => $(table).attr('class').split(' '))
                .uniq()
                .filter(v => v.startsWith('ag-theme-'))
                .value();
        },
        // this refers to init function return value
        filter(tag) {
            return tag.getAttribute('rel') == 'stylesheet'
                && (tag.getAttribute('href').includes('drag-n-drop.css')
                    || tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css')
                    || tag.getAttribute('href').includes('/layer/skin/layer.css'))
                || (tag.getAttribute('href').includes('ag-theme-')
                    && _.findIndex(this, v => tag.getAttribute('href').includes(`${v}.css`)) == -1)
        }
    },
    {
        name: 'hr',
        filter: tag => $(tag).hasClass('horizontal-line')
            || $(tag).hasClass('vertical-line')
    },
    {
        name: 'base'
    },
    {
        name: 'div',
        filter: tag => $(tag).hasClass('layui-layer-shade')
            || $(tag).hasClass('layui-layer')
            || $(tag).hasClass('layui-anim')
            || $(tag).hasClass('layui-layer-page')
            || $(tag).hasClass('layui-layer-rim')
            || $(tag).hasClass('ui-helper-hidden-accessible')
            // Generated div.ui-resizable-handle by resizable would interfere with sortable elements
            || $(tag).hasClass('ui-resizable-handle')
            // Remove Add new item button in layout
            || $(tag).hasClass('grid-footer')
    },
    {
        name: 'span',
        filter: tag => $(tag).hasClass('gs-remove-handle')
            || $(tag).hasClass('gs-resize-handle')
            || $(tag).hasClass(' gs-resize-handle-both')
    }
];

function removeUnusedTags(el) {
    unusedTags.forEach(removeTag, el);
    return el;
}

function emptyChildren(el) {
    $(el).find(emptyChildrenSelectors.join(', ')).empty();
    return el;
}

function generateTableScript(el) {
    $(el).find(`script[class=${tableScript}]`).remove();
    const jsStr = Array.from($(el).find(tableSelector)).reduce((prev, element) => {
        return `${prev}
                ${tableTemplate($(element))}`;
    }, '');
    return appendScript(el, jsStr, tableScript);
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

function generateButtonOnclickScript(el) {
    $(el).find(submitButtonSelector).each(function () {
        let onclick = $(this).attr('onclick');
        if (!onclick) {
            setButtonOnclickAttr(this);
        } else if (!onclick.includes(`${functionName}(this)`)
            && !$(this).attr(dataOnclickFunctionGenerated)) {
            _.endsWith(onclick, ';') && (onclick = onclick.substr(0, onclick.length - 1));
            const appendableScriptElement = $(el).find(`script[class=${appendableScript}]`);
            if (appendableScriptElement.length) {
                appendableScriptElement.html(`
                        ${appendableScriptElement.html()}
                        ${functionTemplate(onclick)}
                    `);
            } else {
                appendScript(el, functionTemplate(onclick), appendableScript);
            }
            $(this).attr(dataOnclickFunctionGenerated, 'true');
        }
    });
    return el;
}

function generatePopupScript(el) {
    return appendScript(el, popupTemplate());
}

function generateGridScript(el) {
    return appendScript(el, gridTemplate());
}

function generateQueryScript(el) {
    return appendScript(el, queryTempate());
}

function generateMultivalueSelectScript(el) {
    return appendScript(el, multivalueselectTemplate());
}

function generateTooltipScript(el) {
    if ($(el).find(`[${dataScriptType}=${tooltipScriptType}]`).length) {
        return el;
    } else {
        return appendScript(el, tooltipTemplate(), reservedScript, tooltipScriptType);
    }
}

function concatContent(prev, cur) {
    return prev.then(prevContent =>
        cur.then(curContent => `
            ${prevContent}
            ${curContent}
        `)
    );
}

function appendScript(el, jsStr, scriptClass = removeableScript, type) {
    jsStr && $(`<script class="${scriptClass}"${type ? ` ${dataScriptType}="${type}"` : ''}></script>`)
        .text(jsStr).appendTo($(el).find('body'));
    return el;
}

function appendStylesheet(el, styleStr) {
    styleStr && $('<style></style>').text(styleStr).insertBefore($(el).find('body'));
    return el;
}

function constructURL(el) {
    const uri = el.tagName == 'LINK' ? 'href' : 'src';
    return new URL($(el).attr(uri), new URL($('#iframeId').attr('src'), el.baseURI)).href;
}

function getExternalContent(tag) {
    return $.ajax({
        url: constructURL(tag)
    });
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

function generateBaseTag(el, pageHref) {
    $('<base>').attr('href', `${window.location.origin}/${pageHref}`).prependTo($(el).find('head'));
    return el;
}

function changeScriptType(el, selector, type) {
    $(el).find(selector).attr('type', type);
    return el;
}

const devScripts = [
    '/dist/iframe.js',
    '/dist/layout.js'
];

function generateDevDependentTags(el) {
    $(el).find('head').append('<link rel="stylesheet" href="../../../../css/drag-n-drop.css">');
    devScripts.forEach((value) =>
        $(el).find('body').append(`<script src="${value}"></script>`));
    return el;
}

function generateAddNewItemDiv(el) {
    $(el).find('div.gridster').after(`
    <div class="grid-footer">
        <button class="add-more-items btn btn-primary">Add new item</button>
    </div>
    `);
    return el;
}

function generateGridRemoveItemSpan(el) {
    $(el).find('div.gridster > div').each(function () {
        if (!$(this).has('span.gs-remove-handle').length) {
            $(this).append('<span class="gs-remove-handle"></span>');
        }
    });
    return el;
}

// select multiple options, just name it as an array[]
// https://github.com/marioizquierdo/jquery.serializeJSON
function addNameBrackets(el) {
    $(el).find(multivalueSelectSelector).each(function () {
        $(this).attr('name') && $(this).attr('name', `${$(this).attr('name')}[]`);
    });
    return el;
}

function removeNameBrackets(el) {
    $(el).find(multivalueSelectSelector).each(function () {
        $(this).attr('name')
            && $(this).attr('name').endsWith('[]')
            && $(this).attr('name', $(this).attr('name').substr(0, $(this).attr('name').length - 2))
    });
    return el;
}

function htmlGenerator(html, ...fns) {
    _.startsWith(html, '<!DOCTYPE') && (html = `<!DOCTYPE html>${html}`);
    const el = document.createElement('html');
    el.innerHTML = html;
    return $(fns.reduce((el, fn) => fn(el), el)).prop('outerHTML');
}

function replacePopupWithForm(el) {
    const popup = $(el).find('div.layui-layer');
    if (popup.length) {
        const form = $(popup).find('div.popup-window').css({
            display: 'none'
        });
        if (form.length) {
            popup.replaceWith(form);
        }
    }
    return el;
}

export {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript, generateButtonOnclickScript,
    replaceWithExternalFiles, generateBaseTag, generateDevDependentTags,
    generatePopupScript, generateMultivalueSelectScript, generateTooltipScript,
    removeRemoveableScripts, addNameBrackets, removeNameBrackets, htmlGenerator, changeScriptType,
    replacePopupWithForm, generateQueryScript, generateGridScript, generateAddNewItemDiv,
    generateGridRemoveItemSpan
};