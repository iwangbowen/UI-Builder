import saveAs from 'file-saver';
import JSZip from 'jszip';
import { defaultHtmlFilename, defaultZipFilename } from '../constants';
import { getBeautifiedHtml } from './dom';

$('#dialog-form').find('input[type=radio]').checkboxradio();
const form = $('#dialog-form').find('form');
const dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 300,
    width: 450,
    modal: true,
    buttons: {
        Export() {
            const value = $('input[name=file]:checked', form).val();
            if (value === 'index.html' || value === 'index.zip') {
                const text = getBeautifiedHtml(window.FrameDocument);
                if (value === 'index.html') {
                    const blob = new Blob([text], { type: "text/html;charset=utf-8" });
                    saveAs(blob, defaultHtmlFilename);
                } else {
                    const zip = new JSZip();
                    zip.file(defaultHtmlFilename, text);
                    zip.generateAsync({ type: 'blob' }).then(blob =>
                        saveAs(blob, defaultZipFilename)
                    );
                }
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

export {
    dialog
};