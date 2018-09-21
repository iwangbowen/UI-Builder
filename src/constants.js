import { tableSelector } from './util/selectors';
import _ from 'lodash';
import 'core-js/es6/string';

const unusedTags = [
    {
        name: 'script',
        filter: tag => tag.getAttribute('src')
            ? (tag.getAttribute('src').includes('iframe')
                || tag.getAttribute('src').includes('interact'))
            : $(tag).hasClass(removeableScript)
    },
    {
        name: 'style',
        filter: tag => tag.getAttribute('type') == 'text/css'
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
            || $(tag).hasClass('ui-helper-hidden-accessible')
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
const appendableScript = 'appendableScript';
const reservedScript = 'reservedScript';
const nonTemplateScriptType = 'text/non-template';
const javascriptScriptType = 'text/javascript';
const dataScriptType = 'data-script-type';
const tooltipScriptType = 'tooltip';

const multiSelectedClass = 'selected-with-ctrl-key';

const pages = [
    { name: 'pds', title: 'PDS Template', url: 'template/oee/html/demo/demo.html' },
    { name: 'playground', title: 'Playground', url: 'demo/playground/index.html' }
];

export {
    importedPageName, importedPageTitle, importedPageHref, baseHref, defaultFilename,
    pages, beautify_options, unusedTags, removeableScript, tableScript, reservedScript,
    multiSelectedClass, appendableScript, nonTemplateScriptType, javascriptScriptType,
    dataScriptType, tooltipScriptType
};