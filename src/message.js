import { generateSharedJSCode, getTemplatePage } from "./util/jsoup";

const parent = window.parent;

function sendMessage(msg) {
    parent.postMessage(msg, '*');
}

let messageData = {};

function getMessageData() {
    return messageData;
}

const cache = {};

function initMessageListener() {
    $(window).on('message', ({ originalEvent: { data } }) => {
        if (data.type == 'updateSharedJS') {
            data.js = generateSharedJSCode();
            sendMessage(data);
        } else if (data.type == 'add') {
            const page = Vvveb.FileManager.getPage(data.template);
            if (cache[page.templateUrl]) {
                data.html = cache[page.templateUrl];
                sendMessage(data);
            } else {
                getTemplatePage(page.templateUrl).then(html => {
                    data.html = html;
                    cache[page.templateUrl] = html;
                    sendMessage(data);
                });
            }
        } else {
            messageData = data;
            Vvveb.FileManager.loadPageFromMessage(data.html);
        }
    });
}

export {
    initMessageListener,
    sendMessage,
    getMessageData
};