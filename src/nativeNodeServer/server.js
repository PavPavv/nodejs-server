'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode(200);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!');
});

server.listen(port, hostname, () => {
  console.log('\x1b[32m', 'Server running at: ');
  console.log('\x1b[33m', `${hostname}:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EACCES') {
    console.log('\x1b[31m', `No access to port: ${port}`);
  }
});
