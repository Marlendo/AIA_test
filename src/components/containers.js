import React from 'react';
import * as RootNavigation from '../router/navigation';
import {
    SafeAreaView,
    View
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../styles';

export const Space = (props) => {
    return (
        <View style={{
            height: props.size,
            width: '100%'
        }} />
    );
};

export const MainHeaderContainer = (props) => {

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.light,
        }}>
            <View style={{
                zIndex: 1
            }}>
                <Appbar.Header style={{
                    backgroundColor: props.barColor ? props.barColor : '#FFFFFF'
                }}>
                    {props.back ? (
                        <Appbar.BackAction
                            onPress={() => {
                                RootNavigation.goBack()
                            }}
                        />
                    ) : null}
                    <Appbar.Content
                        title={props.title ? props.title : 'Title Not Found'}
                        subtitle={props.subtitle ? props.subtitle : null}
                    />
                    <Appbar.Action
                        icon="bell"
                        color={colors.light}
                        onPress={() => {
                            var string = "budi makan bola";
                            var substring = "budi makas";
                            console.log(string.indexOf(substring) !== -1);
                        }} />
                    {
                        props.right
                    }
                </Appbar.Header>
            </View>
            {props.children}
        </SafeAreaView>
    );
};