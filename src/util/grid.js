const isInBuilder = true;

function grid() {
    function hideToolBoxes() {
        if (window.parent) {
            $(window.parent.document)
                .find('#select-box, #highlight-box, #highlight-name').hide();
        }
    }
    if ($('.gridster').length) {
        var gridster = $(".gridster").gridster({
            widget_selector: 'div.gridster > div',
            widget_margins: [5, 5],
            widget_base_dimensions: ['auto', 50],
            shift_widgets_up: false,
            shift_larger_widgets_down: false,
            max_cols: 12,
            max_rows: 60,
            resize: {
                enabled: isInBuilder,
                start: hideToolBoxes
            },
            draggable: {
                start: hideToolBoxes,
                // exclude form children elements to prevent intervention with jquery-ui sortable
                handle: '*:not(form *)'
            }
        }).data('gridster');
        if (isInBuilder) {
            window.parent.enableSortableAndDroppable($('div.gridster > div > form'));
            $('div.gridster > div').each(function () {
                if (!$(this).has('span.gs-remove-handle').length) {
                    $('<span class="gs-remove-handle"></span>').appendTo(this);
                }
            });
            $('div.gridster').on('click', 'div > span.gs-remove-handle', function () {
                gridster.remove_widget($(this).parent());
            });
        } else {
            gridster.disable();
        }
    }
    $('.grid-footer button').click(function () {
        var addedWidget = gridster.add_widget('<div><span class="gs-remove-handle"></span></div>', 3, 3);
        addedWidget && window.parent.enableGridItemDrop(addedWidget);
    });
}

export {
    grid
};