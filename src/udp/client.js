'use strict';

const dgram = require('dgram');

const main = () => {
  const message = Buffer.from('Hello');
  const client = dgram.createSocket('udp4');

  client.send(message, 8000, '127.0.0.1', (err) => {
    if (err) {
      client.close();
      throw err;
    }
  });
};
main();
