import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});

export default function Home(props: any) {
    return (
        <View style={styles.container}>
            <Text>Thank you! You are new logged into your account!</Text>
            <Text>All of your wish list information can be found here!</Text>
        </View>
        // <div style={styling}>
        //     <p>Thank you! You are now logged into your account!</p>
        //     <p>Please download the <a href="*">app</a> and use the <a href="*">extension</a> to fully use Wish List!</p>
        // </div>
    )
}