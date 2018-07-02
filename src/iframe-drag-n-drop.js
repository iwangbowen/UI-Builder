(function () {
    const getCenterCoordinates = $element => ({
        left: $element.offset().left + $element.width() / 2,
        top: $element.offset().top + $element.height() / 2
    });

    const removeAlignmentLines = () => $('.horizontal-line, .vertical-line').remove();

    $(document).ready(() => {
        interact('body *')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: document.body,
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: event => {
                    removeAlignmentLines();

                    var target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    const targetCenter = getCenterCoordinates($(target));
                    Array.from($('body *:visible:not(script)'))
                        .filter(currentValue => currentValue != target)
                        .some(currentValue => {
                            const currentCenter = getCenterCoordinates($(currentValue));
                            const isHorizontalAlign = Math.abs(targetCenter.top - currentCenter.top) <= 1;
                            const isVerticalAlign = Math.abs(targetCenter.left - currentCenter.left) <= 1;
                            console.log(isVerticalAlign);
                            if (isHorizontalAlign) {
                                $('<hr />')
                                    .addClass('horizontal-line')
                                    .css({
                                        top: $(target).offset().top
                                    })
                                    .appendTo($('body'));
                            }
                            if (isVerticalAlign) {
                                $('<hr />')
                                    .addClass('vertical-line')
                                    .css({
                                        left: $(target).offset().left
                                    })
                                    .appendTo($('body'));
                            }
                            return isHorizontalAlign || isVerticalAlign;
                        });
                },
                // call this function on every dragend event
                onend: event => {
                    var textEl = event.target.querySelector('p');

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