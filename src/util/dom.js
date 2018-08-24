import {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript, generateButtonOnclickAttr,
    replaceWithExternalFiles, generateLayerScript, generateMultivalueSelectScript,
    addNameBrackets, generateBaseTag, generateDevDependentTags, removeRemoveableScripts,
    removeNameBrackets, htmlGenerator
} from './jsoup';
import { beautify_options, multiSelectedClass } from '../constants';
import _ from 'lodash';
import { multiSelectedSelector, selectBox, withCtrlKeyActionsSelector, withoutCtrlKeyActionsSelector } from './selectors';

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
    const element = document.createElement('a');
    if (text.length < 2 * 1024 * 1024) {
        element.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(text)}`);
    } else {
        const blob = new Blob([text]);
        element.setAttribute('href', URL.createObjectURL(blob));
    }
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
    html = htmlGenerator(html, removeUnusedTags, emptyChildren, generateTableScript, removeStyleForSelectedElements,
        generateCalendarOnclickAttr, generateSelectOptionsScript, generateSubmitFormScript,
        generateButtonOnclickAttr, generateLayerScript, generateMultivalueSelectScript, addNameBrackets);
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

function generateHtmlFromLocalStorageItemKey(pageHref, itemKey) {
    return htmlGenerator(localStorage.getItem(itemKey),
        generateDevDependentTags, _.curry(generateBaseTag)(_, pageHref), removeRemoveableScripts, removeNameBrackets);
}

function getPage(pageName, pageTitle, pageHref) {
    return {
        name: pageName,
        title: pageTitle,
        url: pageHref,
        srcdoc: generateHtmlFromLocalStorageItemKey(pageHref, pageName)
    };
}

function autoSave() {
    localStorage.setItem(getHash(), getBeautifiedHtml(window.FrameDocument));
}

function loadCallback() {
    // Save automatically every 2 seconds
    setInterval(autoSave, 2000);
}

function getElementWithDraggable(element) {
    return element
        .hasClass('draggable') ?
        element :
        getElementWithDraggable(element.parent());
}

let selectedElements = [];

function getSelectedElements() {
    return selectedElements;
}

function addOrRemoveElement(element) {
    const draggableElement = getElementWithDraggable($(element)).get(0);
    if (_.includes(selectedElements, draggableElement)) {
        _.remove(selectedElements, v => v == draggableElement)
    } else {
        selectedElements.push(draggableElement);
    }
    addStyleForSelectedElements();
}

function clearSelectedElements() {
    selectedElements = [];
    removeStyleForSelectedElements(self.frameDoc.get(0));
}

function removeStyleForSelectedElements(el) {
    $(el).find(multiSelectedSelector).removeClass(multiSelectedClass);
    return el;
}

function addStyleForSelectedElements() {
    $(selectBox).hide();
    removeStyleForSelectedElements(self.frameDoc.get(0));
    _.each(selectedElements, element => $(element).addClass(multiSelectedClass));
}

function highlightWhenHovering(target) {
    const $target = $(target);
    const offset = $target.offset();
    const width = $target.outerWidth();
    const height = $target.outerHeight();
    jQuery("#highlight-box").css(
        {
            top: offset.top - self.frameDoc.scrollTop(),
            left: offset.left - self.frameDoc.scrollLeft(),
            width,
            height,
            display: target.hasAttribute('contenteditable') ? "none" : "block"
        });
    jQuery("#highlight-name").html(self._getElementType(target));
}

function highlightwhenSelected(target, ctrlKeyPressed) {
    const $target = $(target);
    const offset = $target.offset();
    $(selectBox).css({
        "top": offset.top - self.frameDoc.scrollTop(),
        "left": offset.left - self.frameDoc.scrollLeft(),
        "width": $target.outerWidth(),
        "height": $target.outerHeight(),
        "display": "block",
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

export {
    getStyle, setIframeHeight, launchFullScreen, downloadAsTextFile, getBeautifiedHtml, delay,
    getHtml, getHash, getPage, loadCallback, getSelectedElements, clearSelectedElements,
    addOrRemoveElement, highlightWhenHovering, highlightwhenSelected, leftAlignCallback,
    rightAlignCallback, topAlignCallback, bottomAlignCallback, centerAlignCallback,
    middleAlignCallback, getElementWithDraggable, isOverlap, generateHtmlFromLocalStorageItemKey
};