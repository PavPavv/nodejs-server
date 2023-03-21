'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const user = {
  name: 'Xi',
  city: 'Beijing',
  friend: '',
  power: 1,
};

const routing = {
  '/': '<h1>Main page</h1>',
  '/user': user,
  '/user/name': () => user.name.toLocaleUpperCase(),
  '/user/city': () => user.city,
  '/user/*': (client, param) => 'param=' + param[0],
};

const types = {
  object: ([data], cb) => cb(JSON.stringify(data)),
  undefined: (args, cb) => cb('not found'),
  function: ([fn, req, res], cb) => {
    if (fn.length === 3) fn(req, res, cb);
    else cb(JSON.stringify(fn(req, res)));
  },
};

const serve = (data, req, res) => {
  const type = typeof data;
  if (type === 'string') return res.end(data);
  const serializer = types[type];
  serializer([data, req, res], (ser) => serve(ser, req, res));
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    serve(data, req, res);
  })
  .listen(port, hostname, () => {
    console.log('\x1b[32m', 'Server running at: ');
    console.log('\x1b[33m', `${hostname}:${port}`);
  });
