var static = require('node-static');

var file = new(static.Server)('./web');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log("Listening on localhost:8080");