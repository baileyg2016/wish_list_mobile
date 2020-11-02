import React, { FC } from 'react';
import { IListItemDataProps } from './IListItem.types';
import { Card } from 'react-native-elements';
import { Button, Image, Text, View } from 'react-native';
import { getRandomImage } from '../../_helpers/utils';
import { IFriend } from '../friends/IFriends.types';

export const ListItem: FC<IListItemDataProps> = ({ item, onAddNewFriend }) => {
    console.log(getRandomImage())
    return (
        <Card>
            <View>
                <Image
                    // style={styles.image}
                    // resizeMode="cover"
                    source={{ uri: getRandomImage()/*item.image_path*/ }}
                />
                <Text /*style={styles.name}*/>
                    {item.firstName + ' ' + item.lastName}
                </Text>
                <Button
                    onPress={() => onAddNewFriend(item as IFriend)}
                    title="Add"
                />
            </View>
        </Card>
    );
}
