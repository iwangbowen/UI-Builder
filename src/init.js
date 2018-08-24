import Vvveb from './builder';
import {
    importedPageName, importedPageTitle, importedPageHref, pages
} from './constants';
import { getHash, getPage, loadCallback, generateHtmlFromLocalStorageItemKey } from './util/dom';

$(document).ready(function () {
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

// 如果用户点击可以直接清空缓存