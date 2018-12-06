import { generateSharedJSCode } from "./util/jsoup";

const parent = window.parent;

function sendMessage(msg) {
    parent.postMessage(msg, '*');
}

let messageData = {};

function getMessageData() {
    return messageData;
}

function initMessageListener() {
    $(window).on('message', ({ originalEvent: { data } }) => {
        if (data.type == 'updateSharedJS') {
            data.js = generateSharedJSCode();
            sendMessage(data);
        } else if (data.type == 'add' || data.type == 'edit') {
            messageData = data;
            if (data.type == 'add') {
                const page = Vvveb.FileManager.getPage(data.template);
                Vvveb.Builder.loadUrl(page.url);
            } else {
                Vvveb.FileManager.loadPageFromMessage(data.html);
            }
        }
    });
}

export {
    initMessageListener,
    sendMessage,
    getMessageData
};