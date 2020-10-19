import React, { FC } from "react"
import { 
  SafeAreaView, 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from "react-native"
import { wait } from '../../_helpers/utils';
import { IGridListDataProps } from "./IGridListDataProps.types";

const styles = StyleSheet.create({
    list: {
      height: '100%'
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

export const GridFlatList: FC<IGridListDataProps> = ({ data, onPress, refetch }) => {
  const defaultImage = 'https://www.bing.com/images/search?view=detailV2&ccid=0CTqweoE&id=5B9FD8FDD5804CC74EE702886571FEF307A76664&thid=OIP.0CTqweoEjBUNF3lZrhS6egAAAA&mediaurl=http%3a%2f%2fwww.gogiltech.com%2fuploads%2f9%2f0%2f3%2f5%2f9035061%2fs260393869697676086_p170_i2_w416.jpeg&exph=408&expw=416&q=ball+in+hand+gotcha&simid=608025643885725499&ck=A341F28D37862BEE9FFF51C3BC89F21A&selectedIndex=1&FORM=IRPRST';
  const [refreshing, setRefreshing] = React.useState(false);
  console.log(data)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    console.log('refreshing')
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  return (
      <SafeAreaView>
          <FlatList
              style={styles.list}
              data={data}
              refreshing={refreshing}
              onRefresh={onRefresh}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                      <TouchableOpacity
                        key={item.id}
                        style={{ flex: 1 }}
                        onPress={() => onPress(item)}
                      >
                      <Image
                          style={styles.image}
                          source={{
                              uri: item.src ?? defaultImage,
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
                            {item?.cost}
                      </Text>
                      </TouchableOpacity>
                  </View>
              )}
          />
      </SafeAreaView>
    )
}