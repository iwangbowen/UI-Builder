const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world')});
app.listen(8200, () => console.log('listening on port 8200'));
