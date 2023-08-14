import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: `Bearer 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`
    }
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
});