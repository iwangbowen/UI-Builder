import {
    emptyChildrenSelectors, tableSelector, submitButtonSelector, calendarSelector,
    multivalueSelectSelector
} from './selectors';
import { template as tableTemplate, tableScriptType, girds } from '../script-templates/table';
import { template as autoselectinputTemplate, autoSelectInputScriptType } from '../script-templates/autoselectinput';
import { template as submitFormTemplate, functionName, submitFormScriptType } from '../script-templates/submitform';
import { template as popupTemplate, popupScriptType } from '../script-templates/popup';
import { template as queryTempate, queryScriptType } from '../script-templates/query';
import { template as gridTemplate } from '../script-templates/grid';
import { template as multivalueselectTemplate, multiValueSelectScriptType } from '../script-templates/multivalueselect';
import { template as functionTemplate, functionScriptType } from '../script-templates/function';
import { template as tooltipTemplate, tooltipScriptType } from '../script-templates/tooltip';
import { template as buttonClickPopupTemplate, buttonClickPopupScriptType } from '../script-templates/button-click-popup';
import { template as tabsTemplate, tabsScriptType } from '../script-templates/tabs';
import { setOnclickAttr as setCalendarOnclickAttr } from './dataAttr';
import { setOnclickAttr as setButtonOnclickAttr } from './submitbutton';
import findIndex from 'lodash/findIndex';
import endsWith from 'lodash/endsWith';
import curry from 'lodash/curry';
import startsWith from 'lodash/startsWith';
import {
    removeableScript, tableScriptClass, appendableScript,
    dataScriptType, generatedNonExecuteScriptClass, generatedExecuteScriptClass,
    tooltipType
} from '../constants';
import { dataOnclickFunctionGenerated } from '../components/common';
import 'core-js/es6/array';
import 'core-js/es7/array';
import 'core-js/es6/string';
import { imagePlaceholder } from '../common';
import { gridsterStylesheet } from './common';

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
                || tag.getAttribute('src').includes('interact'))
            : $(tag).hasClass(removeableScript)
    },
    {
        name: 'style',
        // reserve stylesheet created by gridster to speed up page loading
        filter: tag => (tag.getAttribute('type') == 'text/css' && tag.id !== gridsterStylesheet)
    },
    {
        name: 'link',
        // this refers to init function return value
        filter(tag) {
            return tag.getAttribute('rel') == 'stylesheet'
                && (tag.getAttribute('href').includes('drag-n-drop.css')
                    || tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css')
                    || tag.getAttribute('href').includes('/layer/skin/layer.css'))
                || (tag.getAttribute('href').includes('ag-theme-')
                    && findIndex(this, v => tag.getAttribute('href').includes(`${v}.css`)) == -1)
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

// Remove image base64 to prevent localStorage QuotaExceededError
function removeImageDataURL(el) {
    $(el).find('img')
        .each(function () {
            const $img = $(this);
            if ($img.attr('src').indexOf('data:image') != -1) {
                $img.attr('src', imagePlaceholder);
            }
        });
    return el;
}

function generateTableScript(el) {
    let jsStr = Array.from($(el).find(tableSelector)).reduce((prev, element) => {
        return `${prev}
                ${tableTemplate($(element))}`;
    }, '');
    jsStr && (jsStr += girds);
    return appendScript(el, jsStr, generatedExecuteScriptClass, tableScriptType);
}

function generateCalendarOnclickAttr(el) {
    $(el).find(calendarSelector).each(function () {
        $(this).attr('onclick') || setCalendarOnclickAttr(this);
    });
    return el;
}

function generateSelectOptionsScript(el) {
    return appendScript(el, autoselectinputTemplate(), generatedNonExecuteScriptClass, autoSelectInputScriptType);
}

function generateSubmitFormScript(el) {
    return appendScript(el, submitFormTemplate(), generatedNonExecuteScriptClass, submitFormScriptType);
}

function generateButtonOnclickScript(el) {
    $(el).find(submitButtonSelector).each(function () {
        let onclick = $(this).attr('onclick');
        if (!onclick) {
            setButtonOnclickAttr(this);
        } else if (!onclick.includes(`${functionName}(this)`)
            && !$(this).attr(dataOnclickFunctionGenerated)) {
            endsWith(onclick, ';') && (onclick = onclick.substr(0, onclick.length - 1));
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
    return appendScript(el, popupTemplate(), generatedNonExecuteScriptClass, popupScriptType);
}

function generateGridScript(el) {
    return appendScript(el, gridTemplate());
}

function generateQueryScript(el) {
    return appendScript(el, queryTempate(), generatedNonExecuteScriptClass, queryScriptType);
}

function generateMultivalueSelectScript(el) {
    return appendScript(el, multivalueselectTemplate(), generatedNonExecuteScriptClass, multiValueSelectScriptType);
}

function generateButtonClickPopupScript(el) {
    return appendScript(el, buttonClickPopupTemplate(), generatedNonExecuteScriptClass, buttonClickPopupScriptType);
}

function generateTooltipScript(el) {
    return appendScript(el, tooltipTemplate(), generatedExecuteScriptClass, tooltipScriptType);
}

function generateTabsScript(el) {
    return appendScript(el, tabsTemplate(), generatedNonExecuteScriptClass, tabsScriptType);
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
    // Compatible with previous code
    if (type === tableScriptType) {
        const tableScript = $(el).find(`script[class=${tableScriptClass}]`);
        if (tableScript.length) {
            tableScript.attr(dataScriptType, type);
            tableScript.attr('class', scriptClass);
            tableScript.text(jsStr);
            return el;
        }
    } else if (type === tooltipScriptType) {
        const tooltipscript = $(el).find(`script[${dataScriptType}=${tooltipType}]`);
        if (tooltipscript.length) {
            tooltipscript.attr(dataScriptType, type);
            tooltipscript.attr('class', scriptClass);
            tooltipscript.text(jsStr);
            return el;
        }
    }

    const script = $(el).find(`script[${dataScriptType}=${type}]`);
    if (script.length) {
        script.text(jsStr);
    } else {
        jsStr && $(`<script class="${scriptClass}"${type ? ` ${dataScriptType}="${type}"` : ''}></script>`)
            .text(jsStr).appendTo($(el).find('body'));
    }
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
    '/dist/iframe.js'
];

function appendScriptWithSrc(el, src) {
    $(el).find('body').append(`<script src="${src}"></script>`);
}

function generatedMissedScripts(el, missedScripts) {
    missedScripts.forEach(curry(appendScriptWithSrc)(el, curry.placeholder));
    return el;
}

function generateDevDependentTags(el) {
    $(el).find('head').append('<link rel="stylesheet" href="../../../../css/drag-n-drop.css">');

    devScripts.forEach(curry(appendScriptWithSrc)(el, curry.placeholder));
    return el;
}

function removeGridsterStylesheet(el) {
    $(el).find(`style#${gridsterStylesheet}`).remove();
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
    startsWith(html, '<!DOCTYPE') && (html = `<!DOCTYPE html>${html}`);
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
    generateGridRemoveItemSpan, removeImageDataURL, generatedMissedScripts, generateButtonClickPopupScript,
    removeGridsterStylesheet, generateTabsScript
};