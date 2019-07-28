import React, { useRef } from 'react';
import { Container, AppContext } from 'next/app';
import { ApolloProvider } from 'react-apollo-hooks';
import Page from '../compontents/layout/Page/Component';
import '../compontents/layout/global-styles';
import initApollo from '../lib/create-apollo-client';
// import theme from '../compontents/layout/theme';
import introspectionResult from '../graphql/_generated_graphql_types';

export interface AppProps extends AppContext {
  pageProps: any;
}

export default function AppComponent(props: any) {
  const apolloClient = useRef(
    initApollo(props.drupalData, {
      introspectionResult: introspectionResult as any,
      baseUrl: '',
    }),
  );

  return (
    <Container>
      <ApolloProvider client={apolloClient.current}>
        <Page component={props.Component} pageProps={props.pageProps} />
      </ApolloProvider>
    </Container>
  );
}

AppComponent.getInitialProps = async ({
  ctx,
  Component,
}: AppContext): Promise<AppProps> => {
  // If the page wants to get its own data, it can also define a
  // getInitialProps function.
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
  } as AppProps;
};
