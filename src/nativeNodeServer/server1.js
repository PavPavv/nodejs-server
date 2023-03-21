'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const user = {
  name: 'Xi',
  city: 'Beijing',
  profession: 'The red emperor',
};

const server = http.createServer((req, res) => {
  res.end(`${user.name} said Dart is awesome and invite to visit China`);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, hostname, () => {
  console.log('\x1b[32m', 'Server running at: ');
  console.log('\x1b[33m', `${hostname}:${port}`);
});
