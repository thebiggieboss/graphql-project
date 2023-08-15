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