import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        register(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
    }
`;

export const ADD_ITEM = gql`
    mutation AddItem($name: String!, $url: String!, $imageURL: String, $cost: Int, $size: String) {
        addItem(name: $name, url: $url, imageURL: $imageURL, cost: $cost, size: $size)
    }
`;

export const DELETE_ITEM = gql`
    mutation DeleteItem($pkItem: Int!) {
        deleteItem(pkItem: $pkItem)
    }
`;

export const ADD_FRIEND = gql`
    mutation AddFriend($pkFriend: Int!) {
        addFriend(pkFriend: $pkFriend)
    }
`;

export const UNFRIEND = gql`
    mutation unFriend($pkFriend: Int!) {
        unFriend(pkFriend: $pkFriend)
    }
`;