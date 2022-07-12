import fastify from 'fastify';
import staticPlugin from '@fastify/static';
import { readFile } from 'fs/promises';
import path from 'path';

const server = fastify({ logger: true });

server.register(staticPlugin, {
  root: path.join(__dirname, '../build/static'),
  prefix: '/static',
});

server.get('/*', async (req, res) => {
  const html = await readFile(path.join(__dirname, '../build/index.html'), 'utf8');
  res.type('text/html').send(html);
});

server.listen({ port: 3000 });
