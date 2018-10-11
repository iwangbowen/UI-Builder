$(function () {
    const gridster = $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: ['auto', 140],
        autogrow_cols: true,
        max_cols: 12,
        resize: {
            enabled: true
        }
    }).data('gridster');
    $('.grid-footer button').click(() => {
        gridster.add_widget('<li></li>');
    });
});