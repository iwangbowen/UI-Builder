const parent = window.parent;

function sendMessage(msg) {
    parent.postMessage(msg, '*');
}

function initMessageListener() {
    $(window).on('message', function (e) {
        console.log(e.originalEvent.data);
    });
}

export {
    initMessageListener,
    sendMessage
};