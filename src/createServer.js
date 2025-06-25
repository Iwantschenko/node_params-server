/* eslint-disable no-console */
'use strict';

const http = require('http');

const getParamsObj = (url) => {
  const queryParams = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (queryParams[key]) {
      queryParams[key] = [].concat(queryParams[key], value);
    } else {
      queryParams[key] = value;
    }
  }

  return queryParams;
};

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');

    const resObject = {
      parts: [
        ...url.pathname
          .slice(1)
          .replace(/\/{2,}/g, '/')
          .split('/'),
      ],
      query: getParamsObj(url),
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ...resObject }));
  });

  return server;
}

module.exports = {
  createServer,
};
