import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from './Top';
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
        let friends: Array<{pkUser: number, FirstName: string, LastName: string, image_path: string}> = await getFriends();

        let count: number = 0;
        let friendsList: Array<Friend> = friends.map(({pkUser, FirstName, LastName, image_path}) => {
            return { id: count++, src: image_path,  pk: pkUser, name: FirstName + ' ' + LastName}
        })
        
        this.setState({
            data: friendsList
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1.3}}>
                        <Title name="Friends" />
                    </View>
                    <TouchableOpacity>
                        <View style={{flex: 1}}>
                            <Image 
                                source={require('../imgs/icons8-add-user-group-man-man-24.png')}
                                style={{
                                    right: 20,
                                    top: 15
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                
                <GridFlatList data={this.state.data} />
            </SafeAreaView>
        );
    }
};
