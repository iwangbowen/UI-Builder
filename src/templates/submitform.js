function template() {

}

function submitForm() {
    $.ajax({
        url: config.login,
        dataType: 'json',
        method : 'POST',
        data: $("#login-form").serializeJSON(),
        success: function (rs, status, xhr) {
            if (rs.code == 200) {
            }
        }
    });
}

export default template;