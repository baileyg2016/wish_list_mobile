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
      width: 180,
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
  const defaultImage = 'https://www.bing.com/images/search?view=detailV2&ccid=0CTqweoE&id=5B9FD8FDD5804CC74EE702886571FEF307A76664&thid=OIP.0CTqweoEjBUNF3lZrhS6egAAAA&mediaurl=http%3a%2f%2fwww.gogiltech.com%2fuploads%2f9%2f0%2f3%2f5%2f9035061%2fs260393869697676086_p170_i2_w416.jpeg&exph=408&expw=416&q=ball+in+hand+gotcha&simid=608025643885725499&ck=A341F28D37862BEE9FFF51C3BC89F21A&selectedIndex=1&FORM=IRPRST';
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
                        }}
                      >
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