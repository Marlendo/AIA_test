import React from 'react';
import { View } from 'react-native';
import { MainHeaderContainer } from '../../components/containers';
import { colors } from '../../styles';
import { LoginFirst } from '../../components/card';
import { Appbar } from 'react-native-paper';

const MyPost = ({ navigation }) => {

    return (
        <MainHeaderContainer
            barColor={colors.secondaryD}
            title={'My Post'}
            right={(
                <Appbar.Action
                    icon="magnify"
                    color={colors.light}
                    onPress={() => {
                        alert('sip')
                    }} />
            )}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LoginFirst />
            </View>
        </MainHeaderContainer>
    );
};

export default MyPost;
