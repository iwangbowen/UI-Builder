import Vvveb from './builder';

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};

$(document).ready(function () {
    var pages = [
        { name: 'oee template', title: 'OEE Template', url: 'template/oee/html/demo/demo.html'},
        { name: 'template', title: 'Template', url: 'web/html/demo/demo.html' },
        { name: "playground", title: "Playground", url: "demo/playground/index.html" }
        // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
        // { name: "album", title: "Album", url: "demo/album/index.html" },
        // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
        // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
        // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
        // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
        // { name: "product", title: "Product", url: "demo/product/index.html" } 
    ];
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