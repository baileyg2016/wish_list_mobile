import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import { IAddNewFriendsDataProps } from './IAddNewFriend.types';

export const AddNewFriend: FC<IAddNewFriendsDataProps> = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    return (
        <SafeAreaView>
            <SearchBar
                placeholder='Search by username'
                onChangeText={onSearch}
                value={search}
            />
        </SafeAreaView>
    );
};
