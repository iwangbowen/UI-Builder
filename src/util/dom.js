import {
    removeUnusedTags, emptyChildren, generateCalendarOnclickAttr,
    replaceWithExternalFiles, addNameBrackets,
    generateBaseTag, generateDevDependentTags, removeRemoveableScripts, removeNameBrackets,
    htmlGenerator, changeScriptType, replacePopupWithForm,
    generateAddNewItemDiv, removeImageDataURL, generatedMissedScripts,
    removeGridsterStylesheet, generateScripts,
    changeLinkTypeToNonEvaluable, changeScriptTypeToNonEvaluable,
    restoreNonEvaluateLinkType, restoreNonEvaluateScriptType, getThemeContent,
    transformGridsterStyle
} from './jsoup';
import {
    html_beaufify_options, multiSelectedClass, nonTemplateScriptType, javascriptScriptType,
    importedPageHref, templatePages, isInIframe, generatedScriptType, generatedExecuteScriptClass, customThemeStyle, customThemeStyleId, dataThemeName, blankPage
} from '../constants';
import curry from 'lodash/curry';
import includes from 'lodash/includes';
import remove from 'lodash/remove';
import each from 'lodash/each';
import mean from 'lodash/mean';
import min from 'lodash/min';
import max from 'lodash/max';
import {
    multiSelectedSelector, selectBox, withCtrlKeyActionsSelector, withoutCtrlKeyActionsSelector,
    userDefinedScriptSelector, nonTemplateScriptSelector, generatedNonExecuteScriptSelector, generatedExecuteScriptSelector
} from './selectors';
import Vvveb from '../gui/components';
import {
    draggableComponent, configurableComponent, sortableClass, cloneableComponent,
    deletableComponent
} from '../components/common';
import { addDatetime } from './common';
import 'core-js/es7/array';
import { enableSortableAndDroppable, disableDroppable, enableDroppable, enableSortableAndDroppableInIframe } from './drag-n-drop';
import { auxiliaryElementsSelector, detailPopup, highlightBoxSelector, highlightNameSelector } from '../common';
import { sendMessage, getMessageData } from '../message';

function getStyle(el, styleProp) {
    value = "";
    //var el = document.getElementById(el);
    if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
        var value = el.style[styleProp];
    else
        if (el.currentStyle)	//check defined css
            var value = el.currentStyle[styleProp];
        else if (window.getComputedStyle) {
            var value = document.defaultView.getDefaultComputedStyle ?
                document.defaultView.getDefaultComputedStyle(el, null).getPropertyValue(styleProp) :
                window.getComputedStyle(el, null).getPropertyValue(styleProp);
        }

    return value;
}

function initPanelToggle() {
    $('#menu-panel .navbar-nav a').on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('#left-panel').toggle();
            $('#right-panel').toggle();
        }
    });
}

function hideAuxiliaryElements() {
    $(auxiliaryElementsSelector).hide();
}

function setPageSrcdoc(page) {
    localStorage.getItem(page.name)
        && (page.srcdoc = generateHtmlFromLocalStorageItemKey(page.url, page.name));
}

function getSavedPages() {
    return Object.keys(localStorage)
        .map(item => createPage(item, item));
}

function isTemplatePage(pageName) {
    return templatePages.some(({ name }) => name == pageName);
}

function decodeHash() {
    return decodeURI(getHash());
}

function initBuilderPage() {
    const decodedHash = decodeHash();
    const savedItems = Object.keys(localStorage);
    const savedPages = getSavedPages();
    const combinedPages = [...savedPages, ...templatePages];
    Vvveb.FileManager
        .addPages(combinedPages)
        .renderPages();

    let page = Vvveb.FileManager.getPage(decodedHash);
    if (page && savedItems.includes(page.name)) {
        setPageSrcdoc(page);
    } else {
        if (!page) {
            page = blankPage;
        }
        window.location.href = `#${addDatetime(page.name)}`;
    }
    Vvveb.FileManager.showActive(page.name);
    Vvveb.Builder.init(page);
}

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
}

// Toggle fullscreen
function launchFullScreen(document) {
    if (document.documentElement.requestFullScreen) {
        if (document.FullScreenElement)
            document.exitFullScreen();
        else
            document.documentElement.requestFullScreen();
        //mozilla
    } else if (document.documentElement.mozRequestFullScreen) {
        if (document.mozFullScreenElement)
            document.mozCancelFullScreen();
        else
            document.documentElement.mozRequestFullScreen();
        //webkit
    } else if (document.documentElement.webkitRequestFullScreen) {
        if (document.webkitFullscreenElement)
            document.webkitExitFullscreen();
        else
            document.documentElement.webkitRequestFullScreen();
        //ie
    } else if (document.documentElement.msRequestFullscreen) {
        if (document.msFullScreenElement)
            document.msExitFullscreen();
        else
            document.documentElement.msRequestFullscreen();
    }
}

function downloadAsTextFile(filename, text) {
    if (window.navigator.msSaveBlob) { // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        const blob = new Blob([text], { type: 'text/html' });
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const element = document.createElement('a');
        if (text.length < 2 * 1024 * 1024) {
            element.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(text)}`);
        } else {
            const blob = new Blob([text], { type: 'text/html' });
            element.setAttribute('href', URL.createObjectURL(blob));
        }
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function getDoctype(doc) {
    if (doc.doctype) {
        return "<!DOCTYPE "
            + doc.doctype.name
            + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '')
            + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '')
            + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '')
            + ">\n";
    } else {
        return '<!DOCTYPE html>';
    }
}

function getHtml(doc) {
    return `${getDoctype(doc)}
            <html>
                ${doc.documentElement.innerHTML}
            </html>`;
}

function destructDoc(doc) {
    return {
        doctype: getDoctype(doc),
        html: doc.documentElement.outerHTML
    }
}

const cache = {};

function getBeautifiedHtml(doc, withExternalFiles = false, containsShared = true) {
    /*
    -I, --indent-inner-html            Indent <head> and <body> sections. Default is false.
    -U, --unformatted                  List of tags (defaults to inline) that should not be reformatted
                                       use empty array to denote that no tags should not be reformatted
     */
    let { doctype, html: origHtml } = destructDoc(doc);
    const key = decodeURI(getHash());

    if (!containsShared && cache[key] && cache[key].html === origHtml) {
        return cache[key].beautifiedHtml;
    } else {
        const width = $(doc).find('body div.gridster').width();
        let html = transformGridsterStyle(origHtml, width);
        // Remove current active tab class with empty string
        html = html.replace(/ ui-tabs-active ui-state-active/g, '');
        // Dom manipulation
        html = htmlGenerator(html, replacePopupWithForm, removeUnusedTags, removeImageDataURL, emptyChildren,
            removeStyleForSelectedElements, generateCalendarOnclickAttr,
            curry(generateScripts)(curry.placeholder, containsShared), addNameBrackets,
            curry(changeScriptType)(curry.placeholder, nonTemplateScriptSelector, javascriptScriptType),
            curry(changeScriptType)(curry.placeholder, generatedExecuteScriptSelector, javascriptScriptType),
            curry(changeScriptType)(curry.placeholder, generatedNonExecuteScriptSelector, javascriptScriptType),
            restoreNonEvaluateLinkType,
            restoreNonEvaluateScriptType);

        // Beautify
        const beautifiedHtml = withExternalFiles ? replaceWithExternalFiles(html).then(html => html_beautify(`${doctype}
            ${html}
        `, html_beaufify_options)) : html_beautify(`
            ${doctype}
            ${html}
        `, html_beaufify_options);
        if (!containsShared) {
            cache[key] || (cache[key] = {});
            cache[key].html = origHtml;
            cache[key].beautifiedHtml = beautifiedHtml;
        }
        return beautifiedHtml;
    }
}

const delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function getHash() {
    return window.location.hash && window.location.hash.substr(1);
}

const depScripts = [
    '../../js/plugins/layer/layer.min.js'
];

function generateHtml(html, pageHref) {
    // @oee not only in html element attributes but in generated js code,
    // so we cannot just loop over all html elements with attributes whose value contains
    // @oee but to replace all occurrences of @oee with @common using simple String method.
    // And it's way more faster to just replace string than to deal with specified elements.
    const newHtml = html.replace(/@oee/g, '@common');
    // Add missed scripts to previously generated page to be backward compatible.
    const missedScripts = depScripts.filter(script => !newHtml.includes(script));

    return htmlGenerator(newHtml, removeGridsterStylesheet, generateAddNewItemDiv,
        changeLinkTypeToNonEvaluable,
        changeScriptTypeToNonEvaluable,
        curry(generatedMissedScripts)(curry.placeholder, missedScripts),
        generateDevDependentTags, curry(generateBaseTag)(curry.placeholder, pageHref), removeRemoveableScripts,
        curry(changeScriptType)(curry.placeholder, generatedNonExecuteScriptSelector, generatedScriptType),
        curry(changeScriptType)(curry.placeholder, userDefinedScriptSelector, nonTemplateScriptType),
        removeNameBrackets);
}

function generateHtmlFromLocalStorageItemKey(pageHref, itemKey) {
    return generateHtml(localStorage.getItem(itemKey), pageHref);
}

function createPage(pageName, pageTitle, pageHref = importedPageHref) {
    return {
        name: pageName,
        title: pageTitle,
        url: pageHref
    };
}

function autoSave() {
    if (isInIframe) {
        const messageData = getMessageData();
        messageData.html = getBeautifiedHtml(window.FrameDocument, false, false);
        sendMessage(messageData);
    } else {
        const html = getBeautifiedHtml(window.FrameDocument, false, false);
        localStorage.setItem(decodeURI(getHash()), html);
    }
}

let timer;

function loadCallback() {
    // Save automatically every 3 seconds
    timer = setInterval(autoSave, 3000);
}

function clearTimer() {
    clearInterval(timer);
}

function getElementWithSpecifiedClass(element) {
    return (!element.length
        || element.hasClass('gs-w')
        || element.hasClass('draggable')
        || element.hasClass(draggableComponent))
        || element.hasClass(configurableComponent)
        || element.hasClass(sortableClass)
        || element.hasClass(cloneableComponent)
        || element.hasClass(deletableComponent)
        ? element
        : getElementWithSpecifiedClass(element.parent());
}

let selectedElements = [];

function getSelectedElements() {
    return selectedElements;
}

function addOrRemoveElement(element) {
    const draggableElement = getElementWithSpecifiedClass($(element)).get(0);
    if (includes(selectedElements, draggableElement)) {
        remove(selectedElements, v => v == draggableElement)
    } else {
        selectedElements.push(draggableElement);
    }
    addStyleForSelectedElements();
}

function clearSelectedElements() {
    selectedElements = [];
    removeStyleForSelectedElements(Vvveb.Builder.frameDoc.get(0));
}

function removeStyleForSelectedElements(el) {
    $(el).find(multiSelectedSelector).removeClass(multiSelectedClass);
    return el;
}

function addStyleForSelectedElements() {
    $(selectBox).hide();
    removeStyleForSelectedElements(Vvveb.Builder.frameDoc.get(0));
    each(selectedElements, element => $(element).addClass(multiSelectedClass));
}

function highlightOnMove(target) {
    const $target = $(target);
    const offset = $target.offset();
    const width = $target.outerWidth();
    const height = $target.outerHeight();
    jQuery(`${highlightBoxSelector}`).css(
        {
            top: offset.top - Vvveb.Builder.frameDoc.scrollTop(),
            left: offset.left - Vvveb.Builder.frameDoc.scrollLeft(),
            width,
            height,
            display: target.hasAttribute('contenteditable') ? "none" : "block"
        });
    jQuery(highlightNameSelector).html(target.tagName);
}

function highlightwhenSelected(target, ctrlKeyPressed) {
    const $target = $(target);
    const offset = $target.offset();
    $(selectBox).css({
        top: offset.top - Vvveb.Builder.frameDoc.scrollTop(),
        left: offset.left - Vvveb.Builder.frameDoc.scrollLeft(),
        width: $target.outerWidth(),
        height: $target.outerHeight(),
        display: "block",
    });
    if (ctrlKeyPressed) {
        jQuery(selectBox).find(withCtrlKeyActionsSelector).show();
        jQuery(selectBox).find(withoutCtrlKeyActionsSelector).hide();
    } else {
        jQuery(selectBox).find(withoutCtrlKeyActionsSelector).show();
        jQuery(selectBox).find(withCtrlKeyActionsSelector).hide();
    }
}

function getLeftestOrTopest(direction) {
    return min(
        selectedElements
            .map($)
            .map(v => v.offset()[direction]));
}

function getRightest() {
    return max(
        selectedElements
            .map($)
            .map(v => v.offset().left + v.outerWidth()));
}

function getBottomest() {
    return max(
        selectedElements
            .map($)
            .map(v => v.offset().top + v.outerHeight()));
}

function getCenterest() {
    return mean(
        selectedElements
            .map($)
            .map(v => v.offset().left + v.outerWidth() / 2));
}

function getMiddlest() {
    return mean(
        selectedElements
            .map($)
            .map(v => v.offset().top + v.outerHeight() / 2));
}

function preventDefault(event) {
    event.preventDefault();
    return false;
}

function moveToLeft(leftest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: leftest,
            top
        })
    });
}

function moveToTop(topest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { left } = $element.offset();
        $element.offset({
            left,
            top: topest
        })
    });
}

function moveToRight(rightest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: rightest - $element.outerWidth(),
            top
        })
    });
}

function moveToBottom(bottomest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { left } = $element.offset();
        $element.offset({
            left,
            top: bottomest - $element.outerHeight()
        })
    });
}

function moveToCenter(centerest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: centerest - $element.outerWidth() / 2,
            top
        })
    });
}

function moveToMiddle(middlest) {
    each(selectedElements, function (element) {
        const $element = $(element);
        const { left } = $element.offset();
        $element.offset({
            left,
            top: middlest - $element.outerHeight() / 2
        })
    });
}

function leftAlign() {
    moveToLeft(getLeftestOrTopest('left'));
}
function topAlign() {
    moveToTop(getLeftestOrTopest('top'));
}

function rightAlign() {
    moveToRight(getRightest());
}

function bottomAlign() {
    moveToBottom(getBottomest());
}

function centerAlign() {
    moveToCenter(getCenterest());
}

function middleAlign() {
    moveToMiddle(getMiddlest());
}

function leftAlignCallback(event) {
    leftAlign();
    return preventDefault(event);
}

function rightAlignCallback(event) {
    rightAlign();
    return preventDefault(event);
}

function topAlignCallback(event) {
    topAlign();
    return preventDefault(event);
}

function bottomAlignCallback(event) {
    bottomAlign();
    return preventDefault(event);
}

function centerAlignCallback(event) {
    centerAlign();
    return preventDefault(event);
}

function middleAlignCallback(event) {
    middleAlign();
    return preventDefault(event);
}

// stackoverflow answer to how to check two elements overlap
// https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
function isOverlap(fstElement, sndElement) {
    const fstRect = fstElement.getBoundingClientRect();
    const sndRect = sndElement.getBoundingClientRect();
    return !(fstRect.right < sndRect.left ||
        fstRect.left > sndRect.right ||
        fstRect.bottom < sndRect.top ||
        fstRect.top > sndRect.bottom)
}

function setGlobalVariables() {
    window.getSelectedElements = getSelectedElements;
    window.getElementWithSpecifiedClass = getElementWithSpecifiedClass;
    window.Vvveb = Vvveb;
    window.enableSortableAndDroppable = enableSortableAndDroppable;
    window.hideAuxiliaryElements = hideAuxiliaryElements;
    window.disableDroppable = disableDroppable;
    window.enableDroppable = enableDroppable;
}

function getClickedPopup(selector) {
    return Vvveb.Builder.frameBody.find(selector);
}

function clickedPopupExists(selector) {
    return !!getClickedPopup(selector).length;
}

function createClickedPopup(id) {
    const popup = $(detailPopup)
        .attr('id', id)
        .insertBefore(Vvveb.Builder.frameBody.find('script').first());
    enableSortableAndDroppableInIframe(popup.find('div.content'));
    return popup;
}

function getCurrentThemeName() {
    return Vvveb.Builder.frameHtml.find(`#${customThemeStyleId}`).attr(dataThemeName);
}

function applyTheme(filename) {
    getThemeContent(filename)
        .then(css => {
            const customThemeStyle = Vvveb.Builder.frameHtml.find(`#${customThemeStyleId}`);
            if (customThemeStyle.length) {
                customThemeStyle.attr(dataThemeName, filename).html(css);
            } else {
                Vvveb.Builder.frameHtml.find('head').append(`<style id="${customThemeStyleId}" ${dataThemeName}="${filename}" type="text/css">${css}</style>`);
            }
        });
}

export {
    getStyle, setIframeHeight, launchFullScreen, downloadAsTextFile, getBeautifiedHtml, delay,
    getHtml, getHash, createPage, loadCallback, getSelectedElements, clearSelectedElements,
    addOrRemoveElement, highlightOnMove, highlightwhenSelected, leftAlignCallback,
    rightAlignCallback, topAlignCallback, bottomAlignCallback, centerAlignCallback,
    middleAlignCallback, getElementWithSpecifiedClass, isOverlap, generateHtmlFromLocalStorageItemKey,
    initPanelToggle, initBuilderPage, setGlobalVariables, setPageSrcdoc, clearTimer, isTemplatePage,
    getSavedPages, hideAuxiliaryElements, decodeHash, generateHtml, getClickedPopup, clickedPopupExists,
    createClickedPopup, applyTheme, getCurrentThemeName
};