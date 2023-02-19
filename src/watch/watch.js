'use strict';

const fs = require('fs');

fs.watch('./test.txt', (event, file) => {
  console.log({ event, file });
});
