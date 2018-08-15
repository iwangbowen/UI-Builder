import Vvveb from './builder';
import {
    importedPageName, importedPageTitle, importedPageHref, lastEditedName,
    lastEditedTitle, lastEditedHref, pages
} from './constants';
import { getBeautifiedHtml, getHash, getPage } from './util/dom';

$(document).ready(function () {
    Vvveb.Gui.init();
    Vvveb.FileManager.init();

    let hash = getHash();
    if ((!hash || hash == lastEditedName) && localStorage.getItem(lastEditedName)) {
        page.unshift(getPage(lastEditedName, lastEditedTitle, lastEditedHref));
        window.location.href = `#${lastEditedName}`;
        hash = getHash();
    } else if (hash == importedPageName && localStorage.getItem(importedPageName)) {
        page.unshift(getPage(importedPageName, importedPageTitle, importedPageHref));
    }

    Vvveb.FileManager.addPages(pages);
    const page = Vvveb.FileManager.getPage(hash);
    if (page) {
        Vvveb.Builder.init(page.url, page.srcdoc, function () {
        });
        Vvveb.FileManager.showActive(page.name);
    } else {
        Vvveb.Builder.init(pages[0].url, pages[0].srcdoc, function () {
        });
        Vvveb.FileManager.showActive(pages[0].name);
    }

    // Automatically save every 2 seconds
    setInterval(() => {
        localStorage.setItem(lastEditedName, getBeautifiedHtml(window.FrameDocument));
    }, 2000);
});