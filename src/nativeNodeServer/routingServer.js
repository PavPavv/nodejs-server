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
  '/': 'Main page',
  '/user': user,
  '/user/name': () => user.name.toLocaleUpperCase(),
  '/user/city': () => user.city,
  '/hello': {
    hello: 'world',
    arr: [1, 2, 3, 4, 5, 6, 7],
  },
  '/api/method': (req, res) => {
    console.log(req.url + ' ' + res.statusCode);
    return {
      status: res.statusCode,
    };
  },
  '/api/method1': (req) => ({
    user,
    url: req.url,
    cookie: req.headers.cookie,
  }),
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data, req, res);
    res.end(result);
  })
  .listen(port, hostname, () => {
    console.log('\x1b[32m', 'Server running at: ');
    console.log('\x1b[33m', `${hostname}:${port}`);
  });

// setInterval(() => (user.power++, 20000));
