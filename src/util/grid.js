const isInBuilder = true;

function grid() {
    var gridster = $(".gridster").gridster({
        widget_selector: 'div',
        widget_margins: [5, 5],
        widget_base_dimensions: ['auto', 50],
        autogrow_cols: true,
        max_cols: 12,
        resize: {
            enabled: isInBuilder
        }
    }).data('gridster');
    if (isInBuilder) {
        $('div.gridster div').each(function () {
            if (!$(this).has('span.gs-remove-handle').length) {
                $('<span class="gs-remove-handle"></span>').appendTo(this);
            }
        });
        $('div.gridster').on('click', 'div span.gs-remove-handle', function () {
            gridster.remove_widget($(this).parent());
        });
    } else {
        gridster.disable().disable_resize();
    }
    $('.grid-footer button').click(function () {
        gridster.add_widget('<div><span class="gs-remove-handle"></span></div>');
    });
}

export {
    grid
};