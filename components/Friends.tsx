import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';

import FetchUserData from '../_services/FetchUserData';
import { GridFlatList } from './GridFlatList';


const { getFriends } = FetchUserData;

interface Friend{
    id: number, 
    pk: number, 
    src: string, 
    name: string
}

export default class Friends extends Component<{}, {data: Array<Friend>}> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: [{id: -1, pk: -1, src: '', name: ''}]
        }
    }

    async componentDidMount() {
        let friends: Array<{pkUser: number, FirstName: string, LastName: string}> = await getFriends();

        let count: number = 0;
        let friendsList: Array<Friend> = friends.map(({pkUser, FirstName, LastName}) => {
            return { id: count++, src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/28059171_2026321230982238_2645834501225872943_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=4meKDUGo3yYAX9cvF2G&_nc_ht=scontent-atl3-1.xx&oh=0aaf097118dfe181914a0d235ce8a1c8&oe=5F1B9908',  pk: pkUser, name: FirstName + ' ' + LastName}
        })
        
        this.setState({
            data: friendsList
        })
    }

    render() {
        return (
            <GridFlatList name="Friends" data={this.state.data} />
        );
    }
};
