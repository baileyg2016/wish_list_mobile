import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FetchUserData from '../_services/FetchUserData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GridFlatList } from './GridFlatList';

const { getWishList } = FetchUserData;

export default class Home extends Component<{}, {data: Array<{id: number, src: string, name: string, cost: string}>} > {
  constructor(props: object) {
    super(props);

    this.state = {
      data: [{id: -1, src: '', name: '', cost: "$-1.00"}]
    }
  }

  async componentDidMount() {
    let list: Array<{pkItem: string, Name: string, url: string, ImageURL: string, Cost: string}> = await getWishList();
    
    let count: number = 0;
    let items: Array<{id: number, src: string, name: string, cost: string}> = list.map(({Name, ImageURL, url, Cost}) => {
        return { id: count++, src: ImageURL, name: Name, cost: Cost, url: url }
    })

    this.setState({
        data: items
    })
    console.log("List: ")
    console.log(list) 
  }

  render() {
    return (
      <GridFlatList name="Wish List" data={this.state.data} />
    )
  }
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
