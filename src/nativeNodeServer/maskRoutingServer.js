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
  '/user/*': (client, param) => 'param=' + param[0],
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
  function: (fn, param, client) => JSON.stringify(fn(client, param)),
};

const matching = [];
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];
    matching.push([rx, route]);
    delete routing[key];
  }
}

const router = (client) => {
  let par;
  let route = routing[client.req.url];
  if (!route) {
    for (let i = 0; i < matching.length; i++) {
      const rx = matching[i];
      par = client.req.url.match(rx[0]);
      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }

  const type = typeof route;
  const renderer = types[type];
  return renderer(route, par, client);
};

http
  .createServer((req, res) => {
    res.end(`Result ${router({ req, res })}`);
  })
  .listen(port, hostname, () => {
    console.log('\x1b[32m', 'Server running at: ');
    console.log('\x1b[33m', `${hostname}:${port}`);
  });
