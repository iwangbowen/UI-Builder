import {
    removeUnusedTags, emptyChildren, generateTableScript, generateCalendarOnclickAttr,
    generateSelectOptionsScript, generateSubmitFormScript, generateButtonOnclickAttr,
    replaceWithExternalFiles, generateLayerScript, generateMultivalueSelectScript,
    addNameBrackets, generateBaseTag, generateDevDependentTags, removeRemoveableScripts,
    removeNameBrackets, htmlGenerator
} from './jsoup';
import { beautify_options, savedHtml } from '../constants';
import _ from 'lodash';

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
    html = htmlGenerator(html, removeUnusedTags, emptyChildren, generateTableScript,
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

function generateHtmlFromLocalStorageItemKey(pageHref) {
    return htmlGenerator(localStorage.getItem(savedHtml),
        generateDevDependentTags, _.curry(generateBaseTag)(_, pageHref), removeRemoveableScripts, removeNameBrackets);
}

function getPage(pageName, pageTitle, pageHref) {
    return {
        name: pageName,
        title: pageTitle,
        url: pageHref,
        srcdoc: generateHtmlFromLocalStorageItemKey(pageHref)
    };
}

function autoSave() {
    localStorage.setItem(savedHtml, getBeautifiedHtml(window.FrameDocument));
}            

export {
    getStyle, setIframeHeight, launchFullScreen, downloadAsTextFile, getBeautifiedHtml, delay,
    getHtml, getHash, getPage, autoSave
};