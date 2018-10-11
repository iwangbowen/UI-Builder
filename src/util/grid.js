const isInBuilder = true;

function grid() {
    const gridster = $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: ['auto', 50],
        autogrow_cols: true,
        max_cols: 12,
        resize: {
            enabled: true
        }
    }).data('gridster');
    if (!isInBuilder) {
        gridster.disable().disable_resize();
    }
    $('.grid-footer button').click(function () {
        gridster.add_widget('<li></li>');
    });
}

export {
    grid
};