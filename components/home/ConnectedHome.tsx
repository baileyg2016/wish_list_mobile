import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ITEMS } from '../../graphql/queries';
import { IHomeDataProps, IItem } from './IHome.types';
import { Home } from './Home';
import { Text, Linking, SafeAreaView } from 'react-native';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';

export const ConnectedHome: FC<IHomeDataProps> = () => {
    const { data, loading, error, refetch } = useQuery(GET_ITEMS);

    const onItemPress = (item: IGridListItem) => {
        const url = item.url ?? '';
        console.log(url)
        Linking.openURL(url);
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        console.error(error);
        console.log("error here")
        console.trace('tracing in connectedhome')
        return <SafeAreaView><Text>Error in ConnectedHome</Text></SafeAreaView>
    }

    console.log(data)
    const items = data.getItems as Array<IItem>;
    return (
        <Home items={items} onItemPress={onItemPress} refetch={refetch}/>
    )
}