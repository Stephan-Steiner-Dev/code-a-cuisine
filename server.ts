import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

/**
 * Creates and configures the Express application used for Angular SSR.
 *
 * Responsibilities:
 * - Serves static assets from the browser build output
 * - Uses Angular's CommonEngine to server-render application routes
 * - Provides APP_BASE_HREF to ensure correct base URL handling
 *
 * @returns Configured Express application instance
 */
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  /**
   * Serves static files (assets, JS bundles, CSS, etc.).
   * The `*.*` route ensures only requests containing a dot are treated as static assets.
   */
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  /**
   * SSR handler for all non-static routes.
   * Uses CommonEngine to render the Angular application for the requested URL.
   */
  server.get('*', (req, res, next) => {
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

/**
 * Starts the Express server.
 * Uses PORT from environment variables if provided, otherwise defaults to 4000.
 */
function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();