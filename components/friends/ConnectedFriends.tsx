import React, { FC, useCallback } from 'react';
import { Friends } from './Friends';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FRIENDS } from '../../graphql/queries';
import { IFriendsDataProps, IFriend } from './IFriends.types';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewFriend } from './AddNewFriend';
import { FriendsWishList } from './FriendsWishList';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';
import { ADD_FRIEND } from '../../graphql/mutations';

export const ConnectedFriends: FC<IFriendsDataProps> = (props: any) => {
    const { data: listOfFriends, loading: friendsLoading, error, refetch: refetchFriends } = useQuery(FRIENDS);
    const Stack = createStackNavigator();
    const [addNewFriend, { data }] = useMutation(ADD_FRIEND);
    
    if (error) {
        console.error(error);
    }

    if (friendsLoading) {
        return <Text>Loading...</Text>
    }
    console.log('here')
    const onFriendPress = (friend: IGridListItem) => {
        console.log('in')
        props.navigation.navigate('FriendsWishList', { pkFriend: friend.pk })
    };
    
    const navigateToAddNewFriend = () => {
        props.navigation.navigate('AddNewFriend');
    };

    const onAddNewFriend = (friend: IFriend) => {
        console.log(friend)
        addNewFriend({ variables: { pkFriend: friend.pkUser } });
    };
    
    const friends = listOfFriends.friends as Array<IFriend>;
    console.log('render')
    return (
        <Stack.Navigator>
            <Stack.Screen name='Friends'>
                {
                    props => 
                        <Friends
                            {...props}
                            friends={friends}
                            onFriendPress={onFriendPress}
                            refetch={refetchFriends}
                            onAddNewFriend={navigateToAddNewFriend}
                        />
                }
            </Stack.Screen>
            <Stack.Screen name='AddNewFriend'>
                {
                    props => <AddNewFriend addNewFriend={onAddNewFriend} />
                }
            </Stack.Screen>
            <Stack.Screen name='FriendsWishList'>
                {
                    props => <FriendsWishList {...props} />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}