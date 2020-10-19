import { useQuery } from '@apollo/react-hooks';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SEARCH_FOR_FRIENDS } from '../../graphql/queries';
import { IAddNewFriendsDataProps } from './IAddNewFriend.types';
import debounce from 'lodash/debounce';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from '../listItem/ListItem';

const styles = StyleSheet.create({
    search: {
        width: "100%",
        color: "#263238",
        fontWeight: "700",
        fontSize: 14,
        backgroundColor: "#e6e6e6",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
    }
});

export const AddNewFriend: FC<IAddNewFriendsDataProps> = ({ addNewFriend }) => {
    const [search, setSearch] = useState('');
    const { 
        data, 
        loading, 
        error,
    } = useQuery(SEARCH_FOR_FRIENDS, { variables: { search: search } });
    
    if (error) {
        console.error(error);
    }

    const onSearch = (searchInput: string) => {
        // debounce(() => {
        setSearch(searchInput);
        // }, 500);
        console.log(data)
    };

    const renderFriend = ({ item }: any) => {
        return <ListItem item={item} onPress={addNewFriend}/>
    };

    return (
        <SafeAreaView>
            <View>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={onSearch}
                    value={search}
                    placeholder='Search by email'
                    style={styles.search}
                />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data?.searchUsersForNewFriends ?? []}
                    renderItem={renderFriend}
                />
            </View>
        </SafeAreaView>
    );
};
