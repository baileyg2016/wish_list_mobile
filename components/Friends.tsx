import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';

import FetchUserData from '../_services/FetchUserData';
import { GridFlatList } from './GridFlatList';


// const { getFriends } = FetchUserData;

export default class Friends extends Component<{}, {data: Array<{id: number, src: string, name: string}>}> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: [{id: -1, src: '', name: ''}]
        }
    }

    async componentDidMount() {
        let friends: Array<{id: number, src: string, name: string}> = [{id: -1, src: '', name: ''}];//await getFriends();

        this.setState({
            data: friends
        })
    }

    render() {
        return (
            <GridFlatList name="Friends" data={this.state.data} />
        );
    }
};
