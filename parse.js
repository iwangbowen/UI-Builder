var css = require('css');
var obj = css.parse('body { font-size: 12px; }');

const fs = require('fs');
fs.readFile('./login.html', (err, buffer) => {
    if (err) {
        console.err(err);
    } else {
        const file = buffer.toString('utf-8');
        console.time('timeTaken');
        let style;
        // non-greedy regexp
        let html = file.replace(/(<style id="gridster-stylesheet" type="text\/css">)([\s\S]*?)(<\/style>)/, (match, p1, p2, p3) => {
            style = p2;
            return `${p1}${p3}`;
        });
        let result = html.match(/data-row="\d*"|data-col="\d*"|data-sizex="\d*"|data-sizey="\d*"/g)
        result = result.map(v => `[${v}]`);
        const ast = css.parse(style);
        // console.log(result)
        ast.stylesheet.rules = ast.stylesheet.rules.filter(rule => {
            return rule.selectors.some(selector => {
                console.log(result.includes(selector));
                return result.includes(selector);
            });
        })
        console.log(css.stringify(ast));

        console.timeEnd('timeTaken');
    }
})