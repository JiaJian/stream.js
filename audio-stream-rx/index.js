/**
 * Project audio-stream-rx
 * @author Jia Jian (@jia_jian)
 * @license MIT
 * @see https://github.com/substack/stream-handbook
 */
var io = require('socket.io')(); // Socket.io Library.
var ss = require('socket.io-stream'); // Socket.io Stream.
var fs = require('fs'); // File system.

var path = require('path'); // Directory path.
var port = 25565;

io.on('connection', function (socket) {
    console.log('Connected> Client has connected. Info dump: ' + socket);

    ss(socket).on('stream-data', function(stream, data) {
    	console.log('Event> Receiving data stream.');
    	console.log('Event> Writing file...');
    	stream.pipe(fs.createWriteStream(Date.now() + ".wav", { flags: 'a' }));

        //console.log('Event> Done!');
    });
 
    socket.on('disconnect', function () {
    	//console.log('server dc');
        io.sockets.emit('Disconnected> user disconnected');
    });
});

io.listen(port);

console.log('Ready> Server running at ws://team-mc.cloudapp.net:%d/', port);