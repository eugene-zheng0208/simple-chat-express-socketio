var log = require('libs/log')(module);

module.exports = function (server) {

    var io = require('socket.io')(server);
    io.set('origins', 'localhost:*'); //403 (No access)
    // io.set('logger', log);

    io.on('connection', function(socket){
        socket.on('message', function(message){
            io.emit('message', message);
        });
    });
};