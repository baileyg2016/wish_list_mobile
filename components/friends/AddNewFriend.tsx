import React, { FC, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IAddNewFriendsDataProps } from './IAddNewFriend.types';

export const AddNewFriend: FC<IAddNewFriendsDataProps> = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    return (
        <SafeAreaView>
            <Text>Working</Text>
        </SafeAreaView>
    );
};
