import React, { FC, useEffect } from 'react';
import {Friends } from './Friends';
import { useQuery } from '@apollo/react-hooks';
import { FRIENDS } from '../../graphql/queries';
import { IFriendsDataProps, IFriend } from './IFriends.types';
import { IGridListDataProps } from '../IGridListDataProps.types';
import { Text } from 'react-native';

export const ConnectedFriends: FC<IFriendsDataProps> = () => {
    const { data, loading, error } = useQuery(FRIENDS);
    if (error) {
        console.error(error);
    }

    if (loading) {
        return <Text>Loading...</Text>
    }
    
    const friends = data.friends as Array<IFriend>;
    console.log(friends)
    return (
        <Friends friends={friends} />
    )
}