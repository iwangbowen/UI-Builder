import Vvveb from './builder';
import pages from './pages';
import $ from '../js/jquery.min';
import { importedPage } from './constants';
import htmlGenerator from './util/htmlGenerator';
import { generateBaseTag, importedPageHref, generateDevDependentTags } from './util/jsoup';

$(document).ready(function () {
    Vvveb.Gui.init();
    Vvveb.FileManager.init();
    const hash = window.location.hash && window.location.hash.substr(1);
    if (hash == importedPage) {
        localStorage.getItem(importedPage) && pages.unshift({
            name: importedPage,
            title: 'Imported Page',
            url: importedPageHref,
            srcdoc: htmlGenerator(localStorage.getItem(importedPage), generateDevDependentTags, generateBaseTag)
        });
    }
    Vvveb.FileManager.addPages(pages);
    var page = Vvveb.FileManager.getPage(hash);
    if (page) {
        Vvveb.Builder.init(page.url, page.srcdoc, function () {
        });
        Vvveb.FileManager.showActive(page.name);
    } else {
        Vvveb.Builder.init(pages[0].url, pages[0].srcdoc, function () {
        });
        Vvveb.FileManager.showActive(pages[0].name);
    }
});