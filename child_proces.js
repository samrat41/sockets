console.log('child_process');
process.on('message', (m, server) => {
  if (m === 'server') {
    console.log('A user connected at child process');
    server.on('connection', (socket) => {
      socket.on('message', (data) => {
        console.log(data);
      });
      socket.emit('message', 'test');
    });
  }
});
