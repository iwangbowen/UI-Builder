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

export { launchFullScreen };