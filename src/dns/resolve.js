'use strict';

const dns = require('dns');

const main = () => {
  dns.resolve('how.programming.works', (err, data) => {
    if (err) {
      if (err === 'ECONNREFUSED') {
        console.log('no inet connection');
      } else {
        console.log('web is dead');
      }
    }
    console.log({ data });
  });

  dns.resolveAny('github.com', (err, data) => {
    if (err) throw err;
    console.log({ data });
  });
};
main();
