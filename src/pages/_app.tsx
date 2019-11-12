import React from 'react';
import { Container, AppContext } from 'next/app';
import { ApolloProvider } from 'react-apollo-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types';
import { NextPageContext } from 'next';
import ApolloClient from 'apollo-client';
import Page from '../compontents/layout/Page/Component';
import '../compontents/layout/global-styles';
import initApollo from '../lib/create-apollo-client';
import introspectionResult from '../graphql/_generated_graphql_types';

export interface AppProps extends AppContext {
  pageProps: any;
  apolloState: NormalizedCacheObject;
}

interface NewAppContext extends AppContext {
  ctx: NewNextPageContext;
}

export interface NewNextPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default function AppComponent(props: AppProps) {
  const client = initApollo(props.apolloState);

  return (
    <Container>
      <ApolloProvider client={client}>
        <Page component={props.Component} pageProps={props.pageProps} />
      </ApolloProvider>
    </Container>
  );
}

AppComponent.getInitialProps = async ({
  ctx,
  Component,
}: NewAppContext): Promise<AppProps> => {
  // Initialize ApolloClient, add it to the ctx object so
  // we can use it in `PageComponent.getInitialProp`.
  ctx.apolloClient = initApollo(
    {},
    {
      baseUrl: ctx.req ? `http://${(ctx.req as any).get('host')!}` : '',
      introspectionResult: introspectionResult as any,
    },
  );

  // If the page wants to get its own data, it can also define a
  // getInitialProps function.
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    apolloState: ctx.apolloClient.cache.extract(),
  } as AppProps;
};
