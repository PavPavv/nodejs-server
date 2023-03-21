'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const hostname = '127.0.0.1';
const port = 8000;

const user = {
  name: 'Xi',
  city: 'Beijing',
  friend: '',
  power: 1,
};
const pid = process.pid;

const routing = {
  '/': '<h1>Main page</h1>',
  '/user': user,
  '/user/name': () => user.name.toLocaleUpperCase(),
  '/user/city': () => user.city,
  '/user/*': (client, param) => 'param=' + param[0],
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
  function: (fn, param, client) => JSON.stringify(fn(client, param)),
};

if (cluster.isMaster) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}, port ${port}`);
  http
    .createServer((req, res) => {
      const data = routing[req.url];
      const type = typeof data;
      const serializer = types[type];
      res.setHeader('ProcessId', pid);
      res.end(serializer(data, req, res));
    })
    .listen(port, hostname, () => {
      console.log('\x1b[32m', 'Server running at: ');
      console.log('\x1b[33m', `${hostname}:${port}`);
    });
}
