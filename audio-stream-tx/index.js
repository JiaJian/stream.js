/**
 * Project audio-stream-tx
 * @author Jia Jian (@jia_jian)
 * @license MIT
 */
var io = require('socket.io-client'); // why not just socket.io?
var ss = require('socket.io-stream'); // Socket.io Stream.
var mic = require('microphone');
var fs = require('fs'); // File system.

var socket = io.connect('ws://localhost:25565');
var stream = ss.createStream();

ss(socket).emit('stream-data', stream);

mic.startCapture();

mic.audioStream.pipe(stream);

process.on('SIGINT', function () {
	mic.stopCapture();
	console.log('Got SIGINT. Press Control-D to exit.');
});