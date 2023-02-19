'use strict';

const dgram = require('dgram');

const main = () => {
  const server = dgram.createSocket('udp4');

  server.on('message', (msg, rinfo) => {
    console.dir({ msg, rinfo });
  });

  server.bind(8000);
};
main();
