import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

// need to update this to totally control the top of the screen
const Top = (props: any) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1.3}}>
            <Text
                style={styles.title}>
                {props.name}
            </Text>
            </View>

            <TouchableOpacity>
            <View style={{flex: 1}}>
                <Image 
                    source={props.imagePath} 
                    style={styles.images}
                />
            </View>
            </TouchableOpacity>
      </View>
    )
};

const styles = StyleSheet.create({
    title: {
        padding: 20,
        paddingLeft: 40,
        fontSize: 20,
        color: 'grey',
        textAlign: 'center'
    },
    images: {
        right: 20, 
        top: 15
    }
})

export default Top;