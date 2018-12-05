const cssPurge = require('css-purge');
const fs = require('fs');
const filePath = './template/oee/css/page_common/template_base.css';
fs.readFile(filePath, (error, buf) => {
    if (error) {
        console.log(error);
    } else {
        let css = buf.toString('utf-8');
        cssPurge.purgeCSS(css, {
            trim: false,
            "trim_comments": true,
            "shorten": false,
            "format": true
        }, function (error, result) {
            if (error) {
                console.error(error)
            } else {
                fs.writeFile(filePath, result, {}, error => {
                    if (error) {
                        console.error(error);
                    }
                });
            }
        });
    }
});