import Vvveb from './builder';
import './components';
import './wysiwyg-editor';
import './gui';
import './file-manager';
import './undo';
import './plugin-codemirror';
import './load-components';
import {
    importedPageName, importedPageTitle, importedPageHref, pages
} from './constants';
import {
    getHash, getPage, loadCallback, generateHtmlFromLocalStorageItemKey,
    getSelectedElements, getElementWithDraggable
} from './util/dom';
import './drag-n-drop';

$(document).ready(function () {
    window.getSelectedElements = getSelectedElements;
    window.getElementWithDraggable = getElementWithDraggable;

    Vvveb.Gui.init();
    Vvveb.FileManager.init();
    const hash = getHash();
    if (hash == importedPageName && localStorage.getItem(importedPageName)) {
        pages.unshift(getPage(importedPageName, importedPageTitle, importedPageHref));
    }
    Vvveb.FileManager.addPages(pages);
    const page = Vvveb.FileManager.getPage(hash);
    if (page) {
        localStorage.getItem(page.name)
            && (page.srcdoc = generateHtmlFromLocalStorageItemKey(page.url, page.name));
        Vvveb.Builder.init(page.url, page.srcdoc, loadCallback);
        Vvveb.FileManager.showActive(page.name);
    } else {
        window.location.href = `#${pages[0].name}`;
        Vvveb.Builder.init(pages[0].url, pages[0].srcdoc, loadCallback);
        Vvveb.FileManager.showActive(pages[0].name);
    }
});