var form = $('#room form');
var inputMessage = $('#room input#message');
var ul = $('#room ul#messages');

var socket = io.connect('', {
    'reconnection delay': 1
});

socket
    .on('message', function(message){
        printMessage(message);
    })
    .on('connect', function () {
        printStatus("Соединение установлено.");
        form.on('submit', sendMessage);
        inputMessage.prop('disabled', false);
    })
    .on('disconnect', function () {
        printStatus("Соединение потеряно.");
        form.off('submit', sendMessage);
        inputMessage.prop('disabled', true);
    })
    .on('reconnect_failed', function () {
        alert('Соединение потеряно навсегда.');
    });

function printStatus(statusMsg) {
    $('<li>'+statusMsg+'</li>').appendTo(ul);
}

function sendMessage(e) {
    e.preventDefault();
    var text = inputMessage.val();
    if (text) {
        socket.emit('message', text, function () {
            printMessage(text);
        });
    }

    inputMessage.val('');
    return false;
}

function printMessage(text) {
    $('<li>'+text+'</li>').appendTo(ul);
}

