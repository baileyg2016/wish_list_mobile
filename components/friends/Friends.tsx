import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from '../Top';
import { GridFlatList } from '../gridItemList/GridFlatList';
import { IFriendsDataProps } from './IFriends.types';
import { getRandomImage } from '../../_helpers/utils';

export const Friends: FC<IFriendsDataProps> = (
    {
        friends, 
        onFriendPress, 
        refetch, 
        onAddNewFriend
    }) => {
    const friendsList = friends.map(({pkUser, firstName, lastName, image_path}) => {
        console.log(getRandomImage())
        return { id: pkUser, src: getRandomImage(),  pk: pkUser, name: firstName + ' ' + lastName}
    });
    return (
        <SafeAreaView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1.3}}>
                    <Title name="Friends" />
                </View>
                <TouchableOpacity
                    onPress={onAddNewFriend}
                >
                    <View style={{flex: 1}}>
                        <Image 
                            source={require('../../imgs/icons8-add-user-group-man-man-24.png')}
                            style={{
                                right: 20,
                                top: 15
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            
            <GridFlatList data={friendsList} onPress={onFriendPress} refetch={refetch} />
        </SafeAreaView>
    );
};
