var beautify = require('js-beautify').html,
    fs = require('fs');

fs.readFile('foo.html', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(beautify(data, {
        indent_inner_html: true,
        unformatted: []
    }));
});