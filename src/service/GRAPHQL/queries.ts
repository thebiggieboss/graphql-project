import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {LocationQueryValue} from "vue-router";


function GetInformation(owner: string, name: string) {
    const { result, loading, error } = useQuery(gql`
        query GetRepositoryInformation ($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                archivedAt
                descriptionHTML
                forkCount
                name
                description
                owner {
                    login
                    avatarUrl
                }
                nameWithOwner
                updatedAt
                homepageUrl
                resourcePath
                stargazerCount
                primaryLanguage {
                    name
                }
                languages(first: 5) {
                    nodes {
                        name
                    }
                }
                url
            }
        }
    `, {
        owner,
        name
    })
    return {
        result,
        loading,
        error
    }
}

// export const SEARCH_REPOSITORIES = gql`
//     query SearchRepositories($query: String!, $perPage: Int!, $page: String!) {
//         search(query: $query, type: REPOSITORY, first: $perPage, after: $page) {
//             repositoryCount
//             nodes {
//                 ... on Repository {
//                     name
//                     description
//                     owner {
//                         login
//                     }
//                 }
//             }
//         }
//     }
// `;

export {
    GetInformation,
}