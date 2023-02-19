'use strict';

const net = require('net');
const socket = new net.Socket();

const main = () => {
  socket.on('data', (data) => {
    console.log('data: ', data.toString('utf8'));
  });

  socket.on('error', (err) => {
    console.log('error: ', err);
  });

  socket.connect(
    {
      port: 8000,
      host: '127.0.0.1',
    },
    () => {
      socket.write('Peace!');
    },
  );
};
main();
