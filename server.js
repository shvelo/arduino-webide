var express = require('express');
var app = express();
var path = require('path');
var io = require('socket.io').listen(80);
var SerialPort = require("serialport").SerialPort;
var serial;

io.sockets.on('connection', function (socket) {
	socket.on('serial-connect', function (data) {
		serial = new SerialPort(data.port, {
			baudrate: data.rate
		});
		serial.on("open", function () {
			serialPort.on('data', function(data) {
				socket.emit('serial-output', { data : data });
			});
			socket.emit('serial-connected', {});
		});
	});
	socket.on('serial-input', function (data) {
		if(serial) serial.write(data.data, function(err, results) {
			socket.emit('serial-result', { err: err, results: results})
		});
	});
});

app.use(express.static(path.join(__dirname, 'web')));

app.listen(4000);
console.log('Listening on port 4000');