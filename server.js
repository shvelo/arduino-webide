var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var io = require('socket.io').listen(4001);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var serial;

io.sockets.on('connection', function (socket) {
	socket.on('serial-connect', function (data) {
		console.log("Connecting to serial "+ data.port +" at rate "+ data.rate);
		serial = new SerialPort(data.port, {
			parser: serialport.parsers.readline("\n"),
			baudrate: data.rate
		});
		serial.on("open", function () {
			serial.on('data', function(data) {
				socket.emit('serial-output', { data : data });
			});
			socket.emit('serial-connected');
		});
	});
	socket.on('disconnect', function() {
		if(serial) {
			console.log("Disconnecting serial");
			serial.close();
		}
	});
	socket.on('serial-disconnect', function() {
		if(serial) {
			console.log("Disconnecting serial");
			serial.close();
		}
	});
	socket.on('serial-input', function (data) {
		if(serial) serial.write(data.data, function(err, results) {
			socket.emit('serial-result', { err: err, results: results})
		});
	});
	socket.on('serial-list', function() {
		serialport.list(function (err, ports) {
			socket.emit('serial-ports', { ports: ports });
		});
	});
});

app.use(express.static(path.join(__dirname, 'web')));

app.listen(4000);
console.log('Listening on port 4000');