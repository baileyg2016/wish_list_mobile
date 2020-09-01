import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ITEMS } from '../../graphql/queries';
import { IHomeDataProps, IItem } from './IHome.types';
import { Home } from './Home';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ConnectedHome: FC<IHomeDataProps> = () => {
    const { data, loading, error } = useQuery(GET_ITEMS);

    if (error) {
        console.error(error);
        return <SafeAreaView><Text>Error</Text></SafeAreaView>
    }

    if (loading) {
        return <Text>Loading...</Text>
    }
    console.log(data)
    const items = data.getItems as Array<IItem>;
    return (
        <Home items={items} />
    )
}