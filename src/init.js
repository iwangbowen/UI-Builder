import Vvveb from './builder';
import pages from './pages';
import $ from '../js/jquery.min';

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};

$(document).ready(function () {
    // Vvveb.Builder.init('demo/playground/index.html', function () {
    // });

    Vvveb.Gui.init();
    Vvveb.FileManager.init();
    Vvveb.FileManager.addPages(pages);
    var page = Vvveb.FileManager.getPage(window.location.hash && window.location.hash.substr(1));
    if (page) {
        Vvveb.Builder.init(page.url, function () {
        });
        Vvveb.FileManager.showActive(page.name);
    } else {
        Vvveb.Builder.init(pages[0].url, function () {
        });
        Vvveb.FileManager.showActive(pages[0].name);
    }
});