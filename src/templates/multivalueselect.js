function template() {
    return `
    var data = [
        {
            id: 0,
            text: 'enhancement'
        },
        {
            id: 1,
            text: 'bug'
        },
        {
            id: 2,
            text: 'duplicate'
        },
        {
            id: 3,
            text: 'invalid'
        },
        {
            id: 4,
            text: 'wontfix'
        }
    ];
        $(document).ready(function() {
            $('.js-example-basic-multiple').select2({
                data: data
            });
        });
    `;
}

export default template;