import Vvveb from './builder';
import { launchFullScreen, getBeautifiedHtml, downloadAsTextFile } from '../util/dom';
import 'core-js/es6/promise';
import { importedPageName, defaultFilename } from '../constants';
import { addDatetime } from '../util/common';
import { dialog, themesDialog, themesForm } from '../util/dialog';
import { getThemeList } from '../util/jsoup';

Vvveb.Actions = {
    init() {
        $("[data-vvveb-action]").each(function () {
            let on = "click";
            if (this.dataset.vvvebOn) {
                on = this.dataset.vvvebOn;
            }
            $(this).on(on, Vvveb.Actions[this.dataset.vvvebAction]);
            if (this.dataset.vvvebShortcut) {
                $(document).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Actions[this.dataset.vvvebAction]);
                $(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Actions[this.dataset.vvvebAction]);
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
                    Vvveb.FileManager.loadPage(itemKey);
                })
            }
            // Change file input value to allow the same name file to upload again
            this.value = '';
        });
    },
    undo() {
        if (Vvveb.WysiwygEditor.isActive) {
            Vvveb.WysiwygEditor.undo();
        } else {
            Vvveb.Undo.undo();
        }
        Vvveb.Builder.selectNode();
    },
    redo() {
        if (Vvveb.WysiwygEditor.isActive) {
            Vvveb.WysiwygEditor.redo();
        } else {
            Vvveb.Undo.redo();
        }
        Vvveb.Builder.selectNode();
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
        Vvveb.CodeEditor.toggle();
    },
    formatCode() {
        Vvveb.CodeEditor.formatCode();
    },
    download() {
        dialog.dialog('open');
    },
    upload() {
        $('#file-input').click();
    },
    switchTheme() {
        getThemeList().then(data => {
            const options = data.reduce((prev, cur) => {
                return `${prev}<option value="${cur}">${cur}</option>`;
            }, '');
            themesForm.find('select').html(options).selectmenu();
            themesDialog.dialog('open');
        })
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