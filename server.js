var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'web')));

app.listen(4000);
console.log('Listening on port 4000');