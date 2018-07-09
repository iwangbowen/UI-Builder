(function () {
    $(document).ready(() => {
        $('#menu-panel .navbar-nav a').on('click', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#left-panel').toggle();
                $('#right-panel').toggle();
            }
        });

        let isElementCreated = false;
        let $element;
        const draggableElements = '#components-list li ol li';

        document.querySelector('iframe').onload = function (event) {
            window.interact = frames[0].interact;
            setInteractables();
        };

        const setInteractables = () => {
            interact(draggableElements, { context: document })
                .draggable({
                    // enable inertial throwing
                    inertia: true,
                    // keep the element within the area of it's parent
                    restrict: {
                        restriction: document.getElementById('iframeId').contentWindow.document.body,
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

                            $element = $(html).appendTo($('body'));
                            const display = $element.css('display');
                            if (display == 'inline-block') {
                                $element.css({
                                    position: 'absolute',
                                    left: event.pageX - $element.outerWidth() / 2,
                                    top: event.pageY - $element.outerHeight() / 2,
                                    'z-index': 999
                                });
                            } else {
                                $element.css({
                                    position: 'absolute',
                                    left: event.pageX - 20,
                                    top: event.pageY - 20,
                                    'z-index': 999
                                });
                            }

                            isElementCreated = true;
                        }

                        const x = (parseFloat($element.attr('data-x')) || 0) + event.dx,
                            y = (parseFloat($element.attr('data-y')) || 0) + event.dy;

                        $element
                            .css({
                                transform: `translate(${x}px, ${y}px)`
                            })
                            .attr({
                                'data-x': x,
                                'data-y': y
                            });
                    },
                    // call this function on every dragend event
                    onend: event => {
                        const left = $element.offset().left - $('#iframeId').offset().left,
                            top = $element.offset().top - $('#iframeId').offset().top;
                        $element
                            .css({
                                left,
                                top,
                                transform: ''
                            }).removeAttr('data-x data-y');

                        isElementCreated = false;
                        // 直接替换元素会有拖动问题，可能是因为元素本身在父页面，所以包含一些特殊属性有关
                        // 获得html字符串，然后再进行替换
                        self.frameBody.append($element.prop("outerHTML"));
                        // self.dragElement && self.dragElement.replaceWith($element.prop("outerHTML"));
                        $element.remove();
                    }
                });
        };
    });
})();