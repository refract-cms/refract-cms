import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError, ErrorResponse } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { store } from '../state/root-store';
import { logout } from '../auth/state/auth-actions';
import { RetryLink } from 'apollo-link-retry';

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 25,
    retryIf: (error, _operation) => !!error,
  },
});

export const createApolloClient = ({ serverUrl }: { serverUrl: string }) => {
  const httpLink = new HttpLink({ uri: `${serverUrl}/internal/graphql` });
  const withTokenLink = setContext((operation, { headers }) =>
    Promise.resolve({
      headers: {
        ...headers,
        authorization: localStorage.getItem('access_token') || '',
      },
    })
  );
  const handleAuthErrorLink = onError(({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
    if (graphQLErrors && graphQLErrors.some((err) => err.message === 'AuthenticationError')) {
      store.dispatch(logout());
    }
    if (networkError) {
      console.log({ networkError });
      switch ((networkError as any).statusCode) {
        case 401: {
          store.dispatch(logout());
          break;
        }
        default: {
          break;
        }
      }
    }
    return forward(operation);
  });
  const link = ApolloLink.from([retryLink, withTokenLink, handleAuthErrorLink, httpLink]);
  const cache = new InMemoryCache({
    addTypename: false,
    dataIdFromObject: (o: any) => o._id,
  });
  return new ApolloClient({
    link,
    cache,
  });
};
