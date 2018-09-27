const baseHref = 'baseHref';
const defaultFilename = 'index.html';

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

const pages = [
    { name: 'pds', title: 'PDS Template', url: 'template/oee/html/demo/demo.html' },
    { name: 'playground', title: 'Playground', url: 'demo/playground/index.html' }
];

export {
    importedPageName, importedPageTitle, importedPageHref, baseHref, defaultFilename,
    pages, beautify_options, removeableScript, tableScript, reservedScript,
    multiSelectedClass, appendableScript, nonTemplateScriptType, javascriptScriptType,
    dataScriptType, tooltipScriptType
};