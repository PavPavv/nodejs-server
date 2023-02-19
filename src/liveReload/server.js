'use strict';

const fs = require('fs');
const http = require('http');

const main = () => {
  const cache = new Map();
  const lib = './lib/';

  const cacheFile = (path) => {
    const filePath = lib + path;
    try {
      const libPath = require.resolve(filePath);
      delete require.cache[libPath];
    } catch (err) {
      return;
    }

    try {
      const mod = require(filePath);
      cache.set(path, mod);
    } catch (err) {
      cache.delete(path);
    }
  };

  const cacheFolder = (path) => {
    fs.readdir(path, (err, files) => {
      if (err) return;
      files.forEach(cacheFile);
    });
  };

  const watch = (path) => {
    fs.watch(path, (event, file) => {
      cacheFile(file);
    });
  };

  const ls = (res, list) => {
    res.write('<html>');
    for (const name of list) {
      res.write(`<li><a href="${name}/">${name}</li>`);
    }
    res.end('</html>');
  };

  cacheFolder(lib);
  watch(lib);

  http
    .createServer((req, res) => {
      const url = req.url.substring(1);
      if (!url) return ls(res, cache.keys());
      const [mod, method] = url.split('/');
      const methods = cache.get(mod);
      if (methods) {
        if (!method) return ls(res, Object.keys(methods));
        const handler = methods[method];
        if (handler) {
          res.end(handler().toString());
          return;
        }
      }
      res.end('File ' + url + ' not found');
    })
    .listen(8000);
};
main();
