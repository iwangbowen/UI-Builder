import saveAs from 'file-saver';
import JSZip from 'jszip';
import { getBeautifiedHtml } from './dom';
import { defaultHtmlFilename, defaultZipFilename, defaultJavaScriptFilename } from '../shared';
import { generateSharedJSCode } from './jsoup';

$('#dialog-form').find('input[type=radio]').checkboxradio();
const form = $('#dialog-form').find('form');
const dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 350,
    width: 600,
    modal: true,
    buttons: {
        Export() {
            const value = $('input[name=file]:checked', form).val();
            if (value === 'index.html' || value === 'index.zip') {
                const text = getBeautifiedHtml(window.FrameDocument);
                if (value === 'index.html') {
                    const blob = new Blob([text], { type: "text/html;charset=utf-8" });
                    saveAs(blob, defaultHtmlFilename);
                    closeDialog();
                } else {
                    const zip = new JSZip();
                    zip.file(defaultHtmlFilename, text);
                    zip.generateAsync({ type: 'blob' }).then(blob => {
                        saveAs(blob, defaultZipFilename);
                        closeDialog();
                    });
                }
            } else if (value === defaultJavaScriptFilename) {
                const js = generateSharedJSCode();
                const blob = new Blob([js], { type: 'text/javascript;charset=utf-8' });
                saveAs(blob, defaultJavaScriptFilename);
                closeDialog();
            }
        },
        Cancel() {
            dialog.dialog('close');
        }
    },
    close: function () {
        form[0].reset();
    }
});

function closeDialog() {
    setTimeout(() => dialog.dialog('close'), 1000);
}

export {
    dialog
};