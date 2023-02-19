'use strict';

const net = require('net');

const main = () => {
  net
    .createServer((socket) => {
      socket.write('Love!');
      console.log(socket.address());
      socket.on('data', (data) => {
        console.log('DATA: ' + data);
      });
    })
    .listen(8000);
};
main();
