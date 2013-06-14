var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

app.listen(8080);
console.log('Listening on port 8080');