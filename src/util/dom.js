function getStyle(el, styleProp) {
    value = "";
    //var el = document.getElementById(el);
    if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
        var value = el.style[styleProp];
    else
        if (el.currentStyle)	//check defined css
            var value = el.currentStyle[styleProp];
        else if (window.getComputedStyle) {
            var value = document.defaultView.getDefaultComputedStyle ?
                document.defaultView.getDefaultComputedStyle(el, null).getPropertyValue(styleProp) :
                window.getComputedStyle(el, null).getPropertyValue(styleProp);
        }

    return value;
}

function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
}

// Toggle fullscreen
function launchFullScreen(document) {
    if (document.documentElement.requestFullScreen) {

        if (document.FullScreenElement)
            document.exitFullScreen();
        else
            document.documentElement.requestFullScreen();
        //mozilla		
    } else if (document.documentElement.mozRequestFullScreen) {

        if (document.mozFullScreenElement)
            document.mozCancelFullScreen();
        else
            document.documentElement.mozRequestFullScreen();
        //webkit	  
    } else if (document.documentElement.webkitRequestFullScreen) {

        if (document.webkitFullscreenElement)
            document.webkitExitFullscreen();
        else
            document.documentElement.webkitRequestFullScreen();
        //ie	  
    } else if (document.documentElement.msRequestFullscreen) {

        if (document.msFullScreenElement)
            document.msExitFullscreen();
        else
            document.documentElement.msRequestFullscreen();
    }
}

function downloadAsTextFile(filename, text) {
    const element = document.createElement('a');
    if (text.length < 2 * 1024 * 1024) {
        element.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(text)}`);
    } else {
        const blob = new Blob([text]);
        element.setAttribute('href', URL.createObjectURL(blob));
    }
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


export { getStyle, setIframeHeight, launchFullScreen, downloadAsTextFile };