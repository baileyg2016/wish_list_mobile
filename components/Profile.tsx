import React, { Component, useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, Image, ImageRequireSource, ImageURISource } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';
import HyperLink from 'react-native-hyperlink';

import Top from './Top';
import FetchFromStorage from '../_services/FetchFromStorage';
const { getFirstName, getLastName, /*getProfilePic*/ } = FetchFromStorage;

const Profile = (props: any) => {
    const logoutClick = (auth: any) => {
        auth.logOut();
    }

    const firstName = async () => await getFirstName();
    const lastName = async () => await getLastName();
    console.log(firstName())
    return (
        <AuthContext.Consumer>
            {auth => (
                <SafeAreaView>
                    <Top name="Profile" imagePath={require('../imgs/icons8-edit-24.png')} />
                    {/* <Text>{firstName()} {lastName()}</Text> */}
                    {/* <Image source={pic} /> */}
                    <Text style={{alignItems: 'center', justifyContent: 'center' }}></Text>
                    <Button color="#8C55AA" title="Log Out" onPress={() => logoutClick(auth)} />
                    <HyperLink linkDefault={true}>
                        <Text>Most icons made by Icons8 https://icons8.com</Text>
                    </HyperLink>
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    );
};

export default Profile;