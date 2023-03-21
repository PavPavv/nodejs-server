'use strict';
const readline = require('node:readline');

// Read console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'PAV>',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('\x1b[35m', 'world');
      break;
    default:
      console.log('\x1b[33m', `Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('\x1b[32m', 'have a nice day');
  process.exit(0);
});
