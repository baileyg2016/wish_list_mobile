import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Top from '../Top';
import { GridFlatList } from '../gridItemList/GridFlatList';
import { IFriendsWishListDataProps } from './IFriends.types';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';
import { useQuery } from '@apollo/react-hooks';
import { FRIENDS_ITEMS } from '../../graphql/queries';
import { Linking, Text } from 'react-native';
import { IItem } from '../home/IHome.types';

export const FriendsWishList: FC<IFriendsWishListDataProps> = (props: any) => {
    const { pkFriend } = props.route.params;
    const { 
        data: friendsItems,
        loading,
        error,
        refetch
    } = useQuery(FRIENDS_ITEMS, {
        variables: { pkFriend: pkFriend }
    });
    
    const itemsList: Array<IGridListItem> = friendsItems?.getFriendsWishList?.map((item: IItem) => {
        return { 
            id: item.pkItem, 
            pk: item.pkItem,
            url: item.url,
            src: item.imageURL, 
            name: item.name, 
            cost: '$' + item.cost
        }
    });

    console.log('itemsList: ', itemsList)

    const onItemPress = (item: IGridListItem) => {
        const url = item.url ?? '';
        Linking.openURL(url);
    }

    return (
    <SafeAreaView>
        {
            loading 
            ? <Text>Loading</Text>
            : <GridFlatList data={itemsList} onPress={onItemPress} refetch={refetch}/>
        }
    </SafeAreaView>
    )
};
