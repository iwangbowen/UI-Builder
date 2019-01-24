const baseHref = 'baseHref';
const defaultFilename = 'index.html';
const baseUrl = document.currentScript ? document.currentScript.src.replace(/[^\/]*?\.js$/, '') : '';

const isInBuilder = true;

const html_beaufify_options = {
    preserve_newlines: false,
    indent_inner_html: true,
    unformatted: ['style']
};

const css_beautify_options = {
    newline_between_rules: false
};

const importedPageName = 'importedPage';
const importedPageTitle = 'Imported Page';
const importedPageHref = `template/oee/html/demo/${importedPageName}.html`;

const removeableScript = 'removeableScript';
const tableScriptClass = 'tableScript';
const generatedNonExecuteScriptClass = 'generated-non-execute-script';
const generatedExecuteScriptClass = 'generated-execute-script';
const appendableScript = 'appendableScript';
const reservedScript = 'reservedScript';
const nonTemplateScriptType = 'text/non-template';
const javascriptScriptType = 'text/javascript';
const generatedScriptType = 'text/generated-script';
const dataScriptType = 'data-script-type';
const dataType = 'data-tag-type';
const nonEvaluable = 'text/non-evaluable';
const tooltipType = 'tooltip';
const multiSelectedClass = 'selected-with-ctrl-key';
const devDep = 'dev-dep';

const componentBgImgHeight = '42';

const pdsPage = {
    name: `pds`,
    title: `pds`,
    url: 'template/oee/html/demo/demo.html',
    templateUrl: 'template/oee/html/demo/demo_template.html'
};
const gridPage = {
    name: 'layout',
    title: 'layout',
    url: 'template/oee/html/demo/grid.html',
    templateUrl: 'template/oee/html/demo/grid_template.html'
};
const blankPage = {
    name: 'blank',
    title: 'blank',
    url: 'template/oee/html/demo/blank.html',
    templateUrl: 'template/oee/html/demo/blank_template.html'
}

const templatePages = [
    blankPage
];

const preservePropertySections = true;

const defaultComponent = "_base";

const isInIframe = window !== window.parent;

const protocal = location.origin.split(':')[0];

const host = location.origin.split(':')[1];

const themesEndpoint = `${protocal}://${host}:8088/api/themes`;

const customThemeStyleId = 'custom-theme';

const dataThemeName = 'data-theme-name';

export {
    importedPageName, importedPageTitle, importedPageHref, baseHref, defaultFilename,
    templatePages, html_beaufify_options, removeableScript, tableScriptClass, reservedScript,
    multiSelectedClass, appendableScript, nonTemplateScriptType, javascriptScriptType,
    dataScriptType, tooltipType, pdsPage, gridPage, blankPage, isInBuilder, isInIframe,
    css_beautify_options, generatedNonExecuteScriptClass, generatedScriptType,
    generatedExecuteScriptClass, dataType, nonEvaluable, devDep, themesEndpoint,
    customThemeStyleId, dataThemeName, componentBgImgHeight, baseUrl, preservePropertySections,
    defaultComponent
};