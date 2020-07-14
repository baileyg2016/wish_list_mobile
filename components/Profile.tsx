import React, { Component, useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Title from './Title';

const Profile = (props: any) => {
    const logoutClick = (auth: any) => {
        auth.logOut();
    }
    return (
        <AuthContext.Consumer>
            {auth => (
                <SafeAreaView>
                    <Title name="Profile" />
                    
                    <Text style={{alignItems: 'center', justifyContent: 'center' }}></Text>
                    <Button color="#8C55AA" title="Log Out" onPress={() => logoutClick(auth)} />
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    );
};

export default Profile;