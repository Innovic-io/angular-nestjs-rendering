// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { ApplicationModule } from './app.module';
import { readFileSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

const app = express();

async function bootstrap() {

  serverRenderingAngular(app);
  const server = await NestFactory.create(ApplicationModule, app);

  await server.listen(3666);
}

function serverRenderingAngular(expressApp: express.Express) {

  enableProdMode();

  const DIST_FOLDER = join(process.cwd(), 'dist');

  // after build
  const template = readFileSync(join(DIST_FOLDER, 'client', 'index.html')).toString();

  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

  const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

  expressApp.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
      // Our index.html
      document: template,
      url: options.req.url,
      // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    }).then(html => {
      callback(null, html);
    });
  });

  expressApp.set('view engine', 'html');
  expressApp.set('views', join(DIST_FOLDER, 'client'));

  // Server static files from /client
  expressApp.get('*.*', express.static(join(DIST_FOLDER, 'client')));

  // All regular routes use the Universal engine
  expressApp.get('*', (req, res, next) => {

    if (req.url.search(/api/) >= 0) {
      return next();
    }

    res.render(join(DIST_FOLDER, 'client', 'index.html'), { req });
  });

}

bootstrap();
