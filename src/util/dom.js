import {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript, generateButtonOnclickScript,
    replaceWithExternalFiles, generateMultivalueSelectScript, addNameBrackets,
    generateBaseTag, generateDevDependentTags, removeRemoveableScripts, removeNameBrackets,
    htmlGenerator, changeScriptType, generateTooltipScript, generatePopupScript, replacePopupWithForm,
    generateQueryScript, generateGridScript, generateAddNewItemDiv, removeImageDataURL, generatedMissedScripts, generateButtonClickPopupScript
} from './jsoup';
import {
    beautify_options, multiSelectedClass, nonTemplateScriptType, javascriptScriptType,
    importedPageHref, templatePages, pdsPage, isInIframe
} from '../constants';
import _ from 'lodash';
import {
    multiSelectedSelector, selectBox, withCtrlKeyActionsSelector, withoutCtrlKeyActionsSelector,
    userDefinedScriptSelector, nonTemplateScriptSelector
} from './selectors';
import Vvveb from '../gui/components';
import {
    draggableComponent, configurableComponent, sortableClass, cloneableComponent,
    deletableComponent
} from '../components/common';
import { addDatetime } from './common';
import 'core-js/es7/array';
import { enableSortableAndDroppable, disableDroppable, enableDroppable, enableSortableAndDroppableInIframe } from './drag-n-drop';
import { auxiliaryElementsSelector, detailPopup } from '../common';
import { sendMessage } from '../message';

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
            page = pdsPage;
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
        html: `<html>${doc.documentElement.innerHTML}</html>`
    }
}

function getBeautifiedHtml(doc, withExternalFiles = false) {
    /*
    -I, --indent-inner-html            Indent <head> and <body> sections. Default is false.
    -U, --unformatted                  List of tags (defaults to inline) that should not be reformatted
                                       use empty array to denote that no tags should not be reformatted
     */
    let { doctype, html } = destructDoc(doc);
    html = htmlGenerator(html, replacePopupWithForm, removeUnusedTags, removeImageDataURL, emptyChildren, generateGridScript, generateTableScript,
        removeStyleForSelectedElements, generateCalendarOnclickAttr, generateSelectOptionsScript, generateSubmitFormScript,
        generateButtonOnclickScript, generatePopupScript, generateQueryScript, generateMultivalueSelectScript, generateButtonClickPopupScript,
        generateTooltipScript, addNameBrackets, _.curry(changeScriptType)(_, nonTemplateScriptSelector, javascriptScriptType));
    return withExternalFiles ? replaceWithExternalFiles(html).then(html => html_beautify(`${doctype}
        ${html}
    `, beautify_options)) : html_beautify(`
        ${doctype}
        ${html}
    `, beautify_options);
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

    return htmlGenerator(newHtml, generateAddNewItemDiv, _.curry(generatedMissedScripts)(_, missedScripts),
        generateDevDependentTags, _.curry(generateBaseTag)(_, pageHref), removeRemoveableScripts,
        _.curry(changeScriptType)(_, userDefinedScriptSelector, nonTemplateScriptType), removeNameBrackets);
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
    const html = getBeautifiedHtml(window.FrameDocument);
    if (isInIframe) {
        sendMessage(html);
    } else {
        localStorage.setItem(decodeURI(getHash()), html);
    }
}

let timer;

function loadCallback() {
    // Save automatically every 2 seconds
    timer = setInterval(autoSave, 2000);
}

function clearTimer() {
    clearInterval(timer);
}

function getElementWithSpecifiedClass(element) {
    return (!element.length
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
    if (_.includes(selectedElements, draggableElement)) {
        _.remove(selectedElements, v => v == draggableElement)
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
    _.each(selectedElements, element => $(element).addClass(multiSelectedClass));
}

function highlightWhenHovering(target) {
    const $target = $(target);
    const offset = $target.offset();
    const width = $target.outerWidth();
    const height = $target.outerHeight();
    jQuery("#highlight-box").css(
        {
            top: offset.top - Vvveb.Builder.frameDoc.scrollTop(),
            left: offset.left - Vvveb.Builder.frameDoc.scrollLeft(),
            width,
            height,
            display: target.hasAttribute('contenteditable') ? "none" : "block"
        });
    jQuery("#highlight-name").html(Vvveb.Builder._getElementType(target));
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
    return _.chain(selectedElements)
        .map($)
        .map(v => v.offset()[direction])
        .min()
        .value();
}

function getRightest() {
    return _.chain(selectedElements)
        .map($)
        .map(v => v.offset().left + v.outerWidth())
        .max()
        .value();
}

function getBottomest() {
    return _.chain(selectedElements)
        .map($)
        .map(v => v.offset().top + v.outerHeight())
        .max()
        .value();
}

function getCenterest() {
    return _.chain(selectedElements)
        .map($)
        .map(v => v.offset().left + v.outerWidth() / 2)
        .mean()
        .value();
}

function getMiddlest() {
    return _.chain(selectedElements)
        .map($)
        .map(v => v.offset().top + v.outerHeight() / 2)
        .mean()
        .value();
}

function preventDefault(event) {
    event.preventDefault();
    return false;
}

function moveToLeft(leftest) {
    _.each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: leftest,
            top
        })
    });
}

function moveToTop(topest) {
    _.each(selectedElements, function (element) {
        const $element = $(element);
        const { left } = $element.offset();
        $element.offset({
            left,
            top: topest
        })
    });
}

function moveToRight(rightest) {
    _.each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: rightest - $element.outerWidth(),
            top
        })
    });
}

function moveToBottom(bottomest) {
    _.each(selectedElements, function (element) {
        const $element = $(element);
        const { left } = $element.offset();
        $element.offset({
            left,
            top: bottomest - $element.outerHeight()
        })
    });
}

function moveToCenter(centerest) {
    _.each(selectedElements, function (element) {
        const $element = $(element);
        const { top } = $element.offset();
        $element.offset({
            left: centerest - $element.outerWidth() / 2,
            top
        })
    });
}

function moveToMiddle(middlest) {
    _.each(selectedElements, function (element) {
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

export {
    getStyle, setIframeHeight, launchFullScreen, downloadAsTextFile, getBeautifiedHtml, delay,
    getHtml, getHash, createPage, loadCallback, getSelectedElements, clearSelectedElements,
    addOrRemoveElement, highlightWhenHovering, highlightwhenSelected, leftAlignCallback,
    rightAlignCallback, topAlignCallback, bottomAlignCallback, centerAlignCallback,
    middleAlignCallback, getElementWithSpecifiedClass, isOverlap, generateHtmlFromLocalStorageItemKey,
    initPanelToggle, initBuilderPage, setGlobalVariables, setPageSrcdoc, clearTimer, isTemplatePage,
    getSavedPages, hideAuxiliaryElements, decodeHash, generateHtml, getClickedPopup, clickedPopupExists,
    createClickedPopup
};