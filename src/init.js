import Vvveb from './builder';
import {
    importedPageName, importedPageTitle, importedPageHref, lastEditedName,
    lastEditedTitle, lastEditedHref, pages, savedHtml
} from './constants';
import { getHash, getPage, loadCallback } from './util/dom';

$(document).ready(function () {
    Vvveb.Gui.init();
    Vvveb.FileManager.init();

    let hash = getHash();
    if ((!hash || hash == lastEditedName) && localStorage.getItem(savedHtml)) {
        pages.unshift(getPage(lastEditedName, lastEditedTitle, lastEditedHref));
        window.location.href = `#${lastEditedName}`;
        hash = getHash();
    } else if (hash == importedPageName && localStorage.getItem(savedHtml)) {
        pages.unshift(getPage(importedPageName, importedPageTitle, importedPageHref));
    }

    Vvveb.FileManager.addPages(pages);
    const page = Vvveb.FileManager.getPage(hash);
    if (page) {
        Vvveb.Builder.init(page.url, page.srcdoc, loadCallback);
        Vvveb.FileManager.showActive(page.name);
    } else {
        Vvveb.Builder.init(pages[0].url, pages[0].srcdoc, loadCallback);
        Vvveb.FileManager.showActive(pages[0].name);
    }
});