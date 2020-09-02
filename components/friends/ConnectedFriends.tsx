import React, { FC } from 'react';
import {Friends } from './Friends';
import { useQuery } from '@apollo/react-hooks';
import { FRIENDS } from '../../graphql/queries';
import { IFriendsDataProps, IFriend } from './IFriends.types';
import { Text } from 'react-native';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';

export const ConnectedFriends: FC<IFriendsDataProps> = () => {
    const { data, loading, error, refetch } = useQuery(FRIENDS);

    const onFriendPress = (item: IGridListItem) => {
        console.log('clicked friend with pk: ', item.pk);
    }

    if (error) {
        console.error(error);
    }

    if (loading) {
        return <Text>Loading...</Text>
    }
    
    const friends = data.friends as Array<IFriend>;
    console.log(friends)
    return (
        <Friends friends={friends} onFriendPress={onFriendPress} refetch={refetch}/>
    )
}