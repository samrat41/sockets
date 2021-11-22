/* const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { fork } = require('child_process');
const path = require('path');

app.use(express.static('public'));
const childPro = fork(path.join(__dirname, '/child_proces.js'));

io.on('connection', function (socket) {
  console.log('A user connected at server', socket.id);
  socket.on('message', (msg) => {
    console.log(msg);
    childPro.send('server', http);
  });
});
childPro.on('message', (message) => {
  console.log(message);
});

http.listen(3000, function () {
  //childPro.send('server', http);
});
 */

const http = require('http');

const hostname = 'localhost';
const port = 3000;
const { fork } = require('child_process');
const path = require('path');
const childPro = fork(path.join(__dirname, '/child_proces.js'));

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log('master server', data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  childPro.send('server', server);
});
