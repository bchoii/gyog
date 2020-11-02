import { readFileSync } from 'fs';
import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as https from 'https';
import { createSecureContext } from 'tls';
import { renderDatetime } from '../../../../../main/src/utils';
import { config } from './config';

const proxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 3001,
  },
  ws: true,
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('x-real-ip', req.connection.remoteAddress);
});

proxy.on('error', (err, req, res) => {
  res.writeHead(500);
  res.end();
});

// port 80, http
const httpServer = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // res.redirect(301, 'https://' + req.headers.host + req.url);
    const Location = 'https://' + req.headers.host + req.url;
    res.writeHead(302, { Location });
    return res.end();
  }
  res.writeHead(403);
  res.end('Forbidden');
});
httpServer.listen(80);

const getSecureContext = domain => {
  try {
    return createSecureContext({
      key: readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`),
      cert: readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`),
    });
  } catch (error) {}
};

const secureContext = {
  [config.host]: getSecureContext(config.host),
};

const httpsOptions = {
  // key: readFileSync(`/etc/letsencrypt/live/${config.host}/privkey.pem`),
  // cert: readFileSync(`/etc/letsencrypt/live/${config.host}/fullchain.pem`),
  SNICallback(domain, cb) {
    // cb(null, secureContext[domain]);
    cb(null, getSecureContext(domain));
  },
};

const log = (req, res) => {
  // console.log(req.connection.remoteAddress, `headers`, req.headers);

  const startHrTime = process.hrtime();
  // res.on('finish', () => {});
  res.on('close', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
  });
};

// port 443, https
const httpsServer = https.createServer(httpsOptions, async (req, res) => {
  const remoteip = req.connection.remoteAddress;

  log(req, res);

  proxy.web(req, res);
});

httpsServer.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});
httpsServer.setTimeout(30000);
httpsServer.listen(443);
console.log(`${renderDatetime(new Date())} Proxy Server is ready.`);

// process.on('SIGINT', async () => {
//   console.log('Proxy Server is shutting down...');
//   await new Promise(r => httpServer.close(r));
//   await new Promise(r => httpsServer.close(r));
//   process.exit(0);
// });
