const fs = require('fs');
const values = require('./src/shared');

fs.readFile('./template.html', (error, buffer) => {
    if (error) {
        console.error(error);
        return;
    }
    const handlebars = require('handlebars');
    const compiled = handlebars.compile(buffer.toString('utf-8'))(values);
    fs.writeFile('./editor.html', compiled, {}, error => {
        if (error) {
            console.error(error);
        }
    });
})