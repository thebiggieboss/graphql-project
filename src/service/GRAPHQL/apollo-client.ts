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