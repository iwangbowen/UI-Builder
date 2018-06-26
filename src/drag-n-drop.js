(function () {
    $(document).ready(() => {
        let isElementCreated = false;
        let $element;

        interact('#components-list li ol li')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: document.getElementById('iframeId').contentWindow.document.getElementById('bodyId'),
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: event => {
                    if (!isElementCreated) {
                        const component = Vvveb.Components.get($(event.target).data("type"));
                        const html = component.dragHtml || component.html;

                        const { left, top } = $(event.target).offset();
                        $element = $(html).css({
                            position: 'absolute',
                            left,
                            top,
                            'z-index': 999,
                            '-webkit-touch-action': 'none',
                            'touch-action': 'none'
                        });
                        isElementCreated = true;
                        $('body').append($element);
                    }

                    const target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    $element.css({
                        transform: `translate(${x}px, ${y}px)`
                    });

                    // update the position attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                // call this function on every dragend event
                onend: event => {
                    console.log(event);

                    const left = $element.offset().left - $('#iframeId').offset().left,
                        top = $element.offset().top - $('#iframeId').offset().top;
                    $element.css({
                        left,
                        top,
                        transform: ''
                    });

                    // $element.css({
                    //     position: 'static',
                    //     transform: `translate(${parseFloat(event.target.getAttribute('data-x')) - left}px, ${parseFloat(event.target.getAttribute('data-y')) - top}px)`
                    // });

                    isElementCreated = false;
                    // remove the position attributes
                    event.target.removeAttribute('data-x');
                    event.target.removeAttribute('data-y');

                    // self.frameBody.append($element);
                    // self.dragElement = $element;
                    self.dragElement && self.dragElement.replaceWith($element);
                    const textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of '
                        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2) | 0))
                            .toFixed(2) + 'px');
                }
            })
        // .resizable({
        //     // resize from all edges and corners
        //     edges: { left: true, right: true, bottom: true, top: true },

        //     // keep the edges inside the parent
        //     restrictEdges: {
        //         outer: 'parent',
        //         endOnly: true,
        //     },

        //     // minimum size
        //     restrictSize: {
        //         min: { width: 100, height: 50 },
        //     },

        //     inertia: true,
        // })
        // .on('resizemove', function (event) {
        //     var target = event.target,
        //         x = (parseFloat(target.getAttribute('data-x')) || 0),
        //         y = (parseFloat(target.getAttribute('data-y')) || 0);

        //     // update the element's style
        //     target.style.width = event.rect.width + 'px';
        //     target.style.height = event.rect.height + 'px';

        //     // translate when resizing from top or left edges
        //     x += event.deltaRect.left;
        //     y += event.deltaRect.top;

        //     target.style.webkitTransform = target.style.transform =
        //         'translate(' + x + 'px,' + y + 'px)';

        //     target.setAttribute('data-x', x);
        //     target.setAttribute('data-y', y);
        //     target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        // });
    });
})();