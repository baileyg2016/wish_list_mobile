import { gql } from '@apollo/client';

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            jwt
            firstName
            lastName
            image_path
        }
    }
`;

export const GET_ITEMS = gql`
    query GetItems {
        getItems {
            pkItem
            name
            url
            imageURL
            cost
            size
        }
    }
`;

export const FRIENDS = gql`
    query Friends {
        friends {
            pkUser
            firstName
            lastName
            image_path
        }
    }
`;

export const SEARCH_FOR_FRIENDS = gql`
    query SearchUsersForNewFriends($search: String!) {
        searchUsersForNewFriends(search: $search) {
            pkUser,
            firstName,
            lastName,
            image_path,
            email
        }
    }
`;