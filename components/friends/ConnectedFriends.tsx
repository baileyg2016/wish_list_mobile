import React, { FC } from 'react';
import { Friends } from './Friends';
import { useQuery } from '@apollo/react-hooks';
import { FRIENDS } from '../../graphql/queries';
import { IFriendsDataProps, IFriend } from './IFriends.types';
import { Text } from 'react-native';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewFriend } from './AddNewFriend';

export const ConnectedFriends: FC<IFriendsDataProps> = (props: any) => {
    const { data: listOfFriends, loading: friendsLoading, error, refetch: refetchFriends } = useQuery(FRIENDS);

    const Stack = createStackNavigator();

    if (error) {
        console.error(error);
    }

    if (friendsLoading) {
        return <Text>Loading...</Text>
    }

    const onFriendPress = (item: IGridListItem) => {
        console.log('clicked friend with pk: ', item.pk);
    }

    const onAddNewFriend = () => {
        props.navigation.navigate('AddNewFriend');
    }
    
    const friends = listOfFriends.friends as Array<IFriend>;

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
                            onAddNewFriend={onAddNewFriend}
                        />
                }
            </Stack.Screen>
            <Stack.Screen name='AddNewFriend'>
                { props => 
                    <AddNewFriend /> }
            </Stack.Screen>
        </Stack.Navigator>
    )
}