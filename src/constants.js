import { tableSelector } from './util/selectors';
import _ from 'lodash';

const unusedTags = [
    {
        name: 'script',
        filter: tag => tag.getAttribute('src')
            && tag.getAttribute('src').includes('iframe-drag-n-drop')
            || $(tag).hasClass(removeableScript)
    },
    {
        name: 'link',
        init(el) {
            return _.chain([...$(el).find(tableSelector)])
                .flatMap(table => $(table).attr('class').split(' '))
                .uniq()
                .filter(v => v.startsWith('ag-theme-'))
                .value();
        },
        // this refers to init function return value
        filter(tag) {
            return tag.getAttribute('rel') == 'stylesheet'
                && (tag.getAttribute('href').includes('drag-n-drop.css')
                    || tag.getAttribute('href').includes('/datepicker/skin/WdatePicker.css')
                    || tag.getAttribute('href').includes('/layer/skin/layer.css'))
                || (tag.getAttribute('href').includes('ag-theme-')
                    && _.findIndex(this, v => tag.getAttribute('href').includes(`${v}.css`)) == -1)
        }
    },
    {
        name: 'hr',
        filter: tag => $(tag).hasClass('horizontal-line')
            || $(tag).hasClass('vertical-line')
    },
    {
        name: 'base'
    },
    {
        name: 'div',
        filter: tag => $(tag).hasClass('layui-layer-shade')
            || $(tag).hasClass('layui-layer')
            || $(tag).hasClass('layui-anim')
            || $(tag).hasClass('layui-layer-page')
            || $(tag).hasClass('layui-layer-rim')
    }
];

const baseHref = 'baseHref';
const defaultFilename = 'index.html';
const beautify_options = {
    preserve_newlines: false,
    indent_inner_html: true,
    unformatted: []
}

const importedPageName = 'importedPage';
const importedPageTitle = 'Imported Page';
const importedPageHref = `template/oee/html/demo/${importedPageName}.html`;

const removeableScript = 'removeableScript';
const tableScript = 'tableScript';

const multiSelectedClass = 'selected-with-ctrl-key';

const pages = [
    { name: 'pds', title: 'PDS Template', url: 'template/oee/html/demo/demo.html' },
    // { name: 'pds_commo', title: 'PDS Common Template', url: 'template/oee/html/demo/common_demo.html' },
    { name: 'playground', title: 'Playground', url: 'demo/playground/index.html' }
    // { name: "narrow-jumbotron", title: "Jumbotron", url: "demo/narrow-jumbotron/index.html" },
    // { name: "album", title: "Album", url: "demo/album/index.html" },
    // { name: "blog", title: "Blog", url: "demo/blog/index.html" },
    // { name: "carousel", title: "Carousel", url: "demo/carousel/index.html" },
    // { name: "offcanvas", title: "Offcanvas", url: "demo/offcanvas/index.html" },
    // { name: "pricing", title: "Pricing", url: "demo/pricing/index.html" },
    // { name: "product", title: "Product", url: "demo/product/index.html" } 
];

export {
    importedPageName, importedPageTitle, importedPageHref, baseHref, defaultFilename,
    pages, beautify_options, unusedTags, removeableScript, tableScript, multiSelectedClass
};