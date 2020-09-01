import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { GridFlatList } from '../GridFlatList';
import Top from '../Top';
import { IHomeDataProps } from './IHome.types';
import { IGridListDataProps } from '../IGridListDataProps.types';

export const Home: FC<IHomeDataProps> = ({ items }) => {
  const itemsList: Array<IGridListDataProps> = items.map(item => {
    return { 
      id: item.pkItem, 
      pk: item.pkItem, 
      src: item.imageURL, 
      name: item.name, 
      cost: `${item.cost}`
    }
  });

  return (
    <SafeAreaView>
      <Top name="Wish List" imagePath={require('../../imgs/icons8-add-24.png')} />  
      <GridFlatList data={itemsList} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    linkContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    link: {
      flex: 2,
      fontSize: 18,
      fontWeight: '400',
    //   color: Colors.primary,
    },
    description: {
      flex: 3,
      paddingVertical: 16,
      fontWeight: '400',
      fontSize: 18,
    //   color: Colors.dark,
    },
    separator: {
    //   backgroundColor: Colors.light,
      height: 1,
    },
  });
