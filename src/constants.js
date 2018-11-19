const baseHref = 'baseHref';
const defaultFilename = 'index.html';

const isInBuilder = true;

const beautify_options = {
    preserve_newlines: false,
    indent_inner_html: true,
    unformatted: []
};

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

const pdsPage = {
    name: `pds`,
    title: `pds`,
    url: './template/oee/html/demo/demo.html'
};
const gridPage = {
    name: 'layout',
    title: 'layout',
    url: './template/oee/html/demo/grid.html'
};

const templatePages = [
    gridPage,
    pdsPage
];

const isInIframe = window !== window.parent;

export {
    importedPageName, importedPageTitle, importedPageHref, baseHref, defaultFilename,
    templatePages, beautify_options, removeableScript, tableScript, reservedScript,
    multiSelectedClass, appendableScript, nonTemplateScriptType, javascriptScriptType,
    dataScriptType, tooltipScriptType, pdsPage, gridPage, isInBuilder, isInIframe
};