import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export const SearchComponent = ({
    onChangeText,
    onBlur,
    value
}) => {

    return (
        <View style={{
            width: '100%',
            position: 'absolute',
            zIndex: 3,
            padding: 0
        }}>
            <Searchbar
                autoFocus={true}
                placeholder="Search"
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value} />
        </View>
    )
}