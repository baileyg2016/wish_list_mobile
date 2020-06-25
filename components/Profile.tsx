import React, { Component, useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../_contexts/Contexts';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = (props: any) => {
    const logoutClick = (auth: any) => {
        auth.logOut();
    }
    return (
        <AuthContext.Consumer>
            {auth => (
                <SafeAreaView>
                    <Button color="#8C55AA" title="Clear tokens" onPress={() => logoutClick(auth)} />
                    <Text style={{alignItems: 'center', justifyContent: 'center' }}>You are on the Profile Page</Text>
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    );
};

export default Profile;