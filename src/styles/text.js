import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '.';
import font from '../constant/font';

const styles = StyleSheet.create({  
    title: {
        fontFamily: font.primaryBold,
        fontSize: 16,        
        textTransform: 'capitalize'     
    },
    subTitle: {
        fontFamily: font.primaryBold,
        fontSize: 12,        
        textTransform: 'capitalize'     
    }    
});

export default styles;