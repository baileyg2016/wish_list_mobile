import React, { FC } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { GridFlatList } from '../gridItemList/GridFlatList';
import Top from '../Top';
import { IHomeDataProps } from './IHome.types';
import { IGridListItem } from '../gridItemList/IGridListDataProps.types';

export const Home: FC<IHomeDataProps> = ({ items, onItemPress, refetch }) => {
  const itemsList: Array<IGridListItem> = items.map(item => {
    return { 
      id: item.pkItem, 
      pk: item.pkItem,
      url: item.url,
      src: item.imageURL, 
      name: item.name, 
      cost: '$' + item.cost
    }
  });

  return (
    <SafeAreaView>
      <Top name="Wish List" imagePath={require('../../imgs/icons8-add-24.png')} />  
      <GridFlatList data={itemsList} onPress={onItemPress} refetch={refetch}/>
    </SafeAreaView>
  )
}
