import React from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView, Text, View, Image, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
    },
    image: {
      height: 120,
      width: '100%',
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
      width: 25,
      height: 25,
      top: 9,
      right: 9,
      position: 'absolute',
    },
  });

export const GridFlatList = (props) => {
    return (
        <SafeAreaView>
            <FlatList
                data={props.data}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                        <TouchableOpacity
                        key={item.id}
                        style={{ flex: 1 }}
                        onPress={async () => {
                            console.log( await AsyncStorage.getItem('access_token'))
                        }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: item.src,
                            }}
                        />
                        <Text
                            style={{
                                textAlign: 'center'
                            }}>
                              {item.name}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'right'
                            }}>
                              {item.cost}
                        </Text>
                        </TouchableOpacity>
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}