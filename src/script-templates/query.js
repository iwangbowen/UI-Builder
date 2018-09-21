import { dataUrl } from '../components/common';

function template() {
    return `
        var queryForm = $('form button#dataSearch').parents('form');
        var queryUrl = $('form button#dataSearch').attr('${dataUrl}');
        function query() {
            submitForm(queryForm, queryUrl,
                function (response) {
                    if (Array.isArray(response.data)) {
                        grids.length && grids[0].gridOptions.api.setRowData(response.data);
                    } else {
                        $.each(response.data, function (key, value) {
                            $.each(grids, function (i, grid) {
                                if (grid.key == key) {
                                    grid.gridOptions.api.setRowData(value);
                                    return false;
                                }
                            });
                        });
                    }
                },
                function () {
                });
        }
        $('form button#dataSearch').click(query);
    `;
}

export default template;