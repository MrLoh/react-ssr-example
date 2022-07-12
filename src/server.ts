import fastify from 'fastify';
import staticPlugin from '@fastify/static';
import { readFile } from 'fs/promises';
import path from 'path';
import React, { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';

import App, { routes } from './App';

const server = fastify({ logger: true });

server.register(staticPlugin, {
  root: path.join(__dirname, '../build/static'),
  prefix: '/static',
});

server.get<{ Params: { path: string } }>('/:path', async (req, res) => {
  const startPath: string = '/' + req.params.path;
  if (!routes.find(({ path }) => path === startPath)) res.status(404);

  const htmlWrapper: string = await readFile(path.join(__dirname, '../build/index.html'), 'utf8');
  const appElement: ReactElement = React.createElement(App, { startPath });
  const appHtml: string = ReactDOMServer.renderToString(appElement);
  const html: string = htmlWrapper.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  res.type('text/html').send(html);
});

server.listen({ port: 3000 });
