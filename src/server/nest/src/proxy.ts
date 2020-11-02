import * as http from 'http';
import * as httpProxy from 'http-proxy';
import { renderDatetime } from '../../../../../main/src/utils';

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
  proxy.web(req, res);
});
httpServer.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});
httpServer.setTimeout(3000);
httpServer.listen(80);

console.log(`${renderDatetime(new Date())} Proxy Server is ready.`);

// process.on('SIGINT', async () => {
//   console.log('Proxy Server is shutting down...');
//   await new Promise(r => httpServer.close(r));
//   await new Promise(r => httpsServer.close(r));
//   process.exit(0);
// });
