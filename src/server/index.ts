import nextJS from 'next';
import express from 'express';
import compression from 'compression';
import slashes from 'connect-slashes';
import postgraphile from 'postgraphile';

require('dotenv').config();

const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === 'production';

const app = nextJS({
  dev: isProd,
  dir: './src',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server
    .use([postgraphile(), compression(), slashes()])
    .get('/*', async (req: any, res: any) => {
      if (!req.path.startsWith('/_next/') && !req.path.startsWith('/static/')) {
        app.render(req, res, '/', {
          isProd,
        } as any);
      } else {
        handle(req, res);
      }
    })
    // @ts-ignore
    .listen(port, (err: any) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.info(`> Ready on http://localhost:${port}`);
    });
});
