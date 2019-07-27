import nextJS from 'next';
import express from 'express';
import compression from 'compression';
import slashes from 'connect-slashes';
import postgraphile from 'postgraphile';
import PostGis from '@graphile/postgis';

require('dotenv').config();

const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === 'production';

const app = nextJS({
  dev: !isProd,
  dir: './src',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server
    .use([
      compression(),
      slashes(false),
      postgraphile(process.env.DATABASE_URL, 'omgisaw', {
        appendPlugins: [PostGis],
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
      }),
    ])
    .get('/*', async (req: any, res: any) => {
      if (!req.path.startsWith('/_next/') && !req.path.startsWith('/static/')) {
        const slug = req.url.replace('/', '');

        // TODO: check whether the slug exists in the database
        if (slug === 'in subject database' || true) {
          app.render(req, res, `/subject/${slug}`, {
            isProd,
          } as any);
        } else {
          // TODO: check if normal route (home, about, t&c, etc.), or an actual 404.
          app.render(req, res, '/', {
            isProd,
          } as any);
        }
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
