var socket = io.connect();

socket.on('connect', function () {
  console.log('connected socket at client', socket.id);
});

socket.emit('message', 'message from client');

socket.on('message', function (data) {
  console.log(data);
});

socket.on('disconnect', function () {
  console.log('disconected');
});
