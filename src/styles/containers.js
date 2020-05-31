import React from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({   
    tabsIcon: {
        width: 30,
        padding: 2,
        marginTop: -7
    },
    favorite: {
        position: 'absolute',
        backgroundColor: colors.lightL,
        borderRadius: 100,
        right: 10,
        top: -50,
    }
});

export default styles;