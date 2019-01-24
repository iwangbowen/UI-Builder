import Builder from './builder';
import Undo from './undo';
import WysiwygEditor from './wysiwyg-editor';
import FileManager from './file-manager';
import CodeEditor from './plugin-codemirror';
import { launchFullScreen, getBeautifiedHtml, downloadAsTextFile, getCurrentThemeName } from '../util/dom';
import 'core-js/es6/promise';
import { importedPageName, defaultFilename } from '../constants';
import { addDatetime } from '../util/common';
import { dialog, themesForm, themesDialog, basicDialog } from '../util/dialog';
import { getThemeList } from '../util/jsoup';
import { errorDialogTitle, requestErrorContent, undoHistoryId } from '../shared';

export default Actions = {
    init() {
        const self = this;
        $("[data-vvveb-action]").each(function () {
            let on = "click";
            if (this.dataset.vvvebOn) {
                on = this.dataset.vvvebOn;
            }
            $(this).on(on, self[this.dataset.vvvebAction]);
            if (this.dataset.vvvebShortcut) {
                $(document).bind('keydown', this.dataset.vvvebShortcut, self[this.dataset.vvvebAction]);
                $(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, self[this.dataset.vvvebAction]);
            }
        });
        this._initFileUpload();
    },
    _initFileUpload() {
        $('#file-input').on('change', function () {
            const file = this.files[0];
            if (file) {
                new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        resolve(evt.target.result);
                    }
                    reader.onerror = function (evt) {
                        reject(evt)
                    }
                }).then(function (html) {
                    const itemKey = addDatetime(importedPageName);
                    localStorage.setItem(itemKey, html);
                    FileManager.loadPage(itemKey);
                })
            }
            // Change file input value to allow the same name file to upload again
            this.value = '';
        });
    },
    undo() {
        if (WysiwygEditor.isActive) {
            WysiwygEditor.undo();
        } else {
            Undo.undo();
        }
        Builder.selectNode();
    },
    showUndoHistory() {
        console.log(this);
        $(`#${undoHistoryId}`);
    },
    redo() {
        if (WysiwygEditor.isActive) {
            WysiwygEditor.redo();
        } else {
            Undo.redo();
        }
        Builder.selectNode();
    },
    check() {
        $('#textarea-modal textarea').val(getBeautifiedHtml(window.FrameDocument, false, false));
        $('#textarea-modal').modal();
    },
    viewport() {
        $("#canvas").attr("class", this.dataset.view);
    },
    toggleEditor() {
        $("#vvveb-builder").toggleClass("bottom-panel-expand");
        CodeEditor.toggle();
    },
    formatCode() {
        CodeEditor.formatCode();
    },
    download() {
        dialog.dialog('open');
    },
    upload() {
        $('#file-input').click();
    },
    switchTheme() {
        getThemeList()
            .then(data => {
                const options = data.filter(theme => theme.endsWith('.css')).reduce((prev, cur) => {
                    return `${prev}<option value="${cur}">${cur}</option>`;
                }, '');
                themesForm.find('select').html(options)
                    .selectmenu({
                        width: 300
                    });
                const currentThemeName = getCurrentThemeName();
                if (currentThemeName) {
                    themesForm.find('select').val(currentThemeName).selectmenu('refresh');
                }
                themesDialog.dialog('open');
            })
            .catch(e => {
                basicDialog.set({
                    title: errorDialogTitle,
                    content: requestErrorContent
                }).open();
            });
    },
    downloadWithExternalFiles() {
        getBeautifiedHtml(window.FrameDocument, true)
            .then(html => downloadAsTextFile(defaultFilename, html));
    },
    preview() {
        if ($('#left-panel').is(':visible')) {
            this.shownPanel = 'left-panel';
            this.hiddenPanel = 'right-panel';
            $('#left-panel, #right-panel').hide();
            this.isPreview = true;
        } else if ($('#right-panel').is(':visible')) {
            this.shownPanel = 'right-panel';
            this.hiddenPanel = 'left-panel';
            $('#left-panel, #right-panel').hide();
            this.isPreview = true;
        } else {
            this.isPreview = false;
            $(`#${this.shownPanel}`).show();
            $(`#${this.hiddenPanel}`).hide();
        }
        $('#menu-panel').toggle();
        $("#iframe-layer").toggle();
        $("#vvveb-builder").toggleClass("preview");
    },
    fullscreen() {
        launchFullScreen(document); // the whole page
    },
    componentSearch() {
        const searchText = this.value;
        $("#components-list li ol li").each(function () {
            $this = $(this);
            $this.hide();
            if ($this.data("search").indexOf(searchText) > -1) $this.show();
        });
    },
    clearComponentSearch() {
        $("#component-search").val("").keyup();
    }
};