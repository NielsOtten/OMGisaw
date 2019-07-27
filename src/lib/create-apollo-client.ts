import fetch from 'fetch-everywhere';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function createApollo(
  initialState = {},
  options = {
    baseUrl: '',
    introspectionResult: undefined,
  },
) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';

  const link = new HttpLink({
    uri: `${options.baseUrl || ''}/graphql`,
    fetch,
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link,
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: options.introspectionResult,
      }),
    }).restore(initialState),
  });
}

export default function initApollo(
  initialState = {},
  options = {
    baseUrl: '',
    introspectionResult: undefined,
  },
) {
  if (typeof window === 'undefined') {
    return createApollo(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = createApollo(initialState, options);
  }

  return apolloClient;
}
