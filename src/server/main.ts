// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

import { readFileSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { FOLDER_CLIENT, FOLDER_DIST } from '../shared/constants';

import { ApplicationModule } from './server.module';

const app = express();

async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    serverRender(app);
  }

  const server = await NestFactory.create(ApplicationModule, app);

  await server.listen(process.env.PORT || 3666);
}

/**
 * Render Angular on Server Side instead on client
 *
 * @param {e.Express} expressApp
 */
function serverRender(expressApp: express.Express) {
  enableProdMode();

  // after build
  const template = readFileSync(
    join(FOLDER_DIST, FOLDER_CLIENT, 'index.html')
  ).toString();

  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
  } = require('../../dist/server/main.bundle');

  const {
    provideModuleMap
  } = require('@nguniversal/module-map-ngfactory-loader');

  expressApp.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
      // Our index.html
      document: template,
      url: options.req.url,
      // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP),
        {
          provide: 'serverUrl',
          useValue: `${options.req.protocol}://${options.req.get('host')}`
        }
      ]
    }).then(html => {
      callback(null, html);
    });
  });

  expressApp.set('view engine', 'html');
  expressApp.set('views', join(FOLDER_DIST, FOLDER_CLIENT));

  // Server static files from /client
  expressApp.get('*.*', express.static(join(FOLDER_DIST, FOLDER_CLIENT)));
}

bootstrap();
