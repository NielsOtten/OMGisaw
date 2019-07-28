import nextJS from 'next';
import express from 'express';
import compression from 'compression';
import slashes from 'connect-slashes';
import postgraphile from 'postgraphile';
import PostGis from '@graphile/postgis';
import introspectionResult, {
  SubjectSlugQuery,
  SubjectSlugDocument,
} from '../graphql/_generated_graphql_types';
import createApollo from '../lib/create-apollo-client';

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
        disableQueryLog: isProd,
      }),
    ])
    .get('/*', async (req: any, res: any) => {
      if (!req.path.startsWith('/_next/') && !req.path.startsWith('/static/')) {
        const slug = req.url.replace('/', '');

        const client = createApollo(
          {},
          {
            baseUrl: `http://${req.get('host')}`,
            introspectionResult: introspectionResult as any,
          },
        );

        const requestBody = {
          query: SubjectSlugDocument,
          variables: {
            slug,
          },
        };

        const queryResult = await client.query<SubjectSlugQuery>(requestBody);

        if (
          queryResult.data.subject &&
          slug === queryResult.data.subject.slug
        ) {
          app.render(req, res, `/subject/${slug}`, {
            isProd,
          } as any);
        } else {
          const route = req.url.split('/')[1];
          app.render(req, res, route, {
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
