import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { LoggerService } from './src/app/util/logger.service';
import { ConfigService } from './src/app/util/config.service';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();
  const logger = new LoggerService();
  const config = new ConfigService('/config').init();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.json())

  server.get('/config/settings', (req, res) => {
    try {
      res.send({data: 'Ok', settings: config.getSettings()});
    } catch (error) {
      logger.error("Error in /config/service/", [error]);
    }
  });

  server.post('/api/log', (req, res) => {
    try {
      const level: string = req?.body?.level || 'info';
      const message: string = req?.body?.message || 'no message provided';
      logger.log(level, message);
      res.sendStatus(202);
    } catch (error) {
      logger.error("Error logging message", [error]);
    }
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
