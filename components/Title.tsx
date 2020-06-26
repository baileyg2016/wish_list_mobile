import React from 'react';
import { Text } from 'react-native';

const Title = (props: any) => {
    return (
        <Text
            style={{
            padding: 16,
            fontSize: 20,
            color: 'grey',
            textAlign: 'center'
            }}>
            {props.name}
        </Text>
    )
};

export default Title;