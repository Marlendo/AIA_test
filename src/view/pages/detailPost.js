import React from 'react';
import { View, Text } from 'react-native';
import { MainHeaderContainer } from '../../components/containers';
import { colors } from '../../styles';
import { LoginFirst } from '../../components/card';
import { Appbar } from 'react-native-paper';

const DetailPost = ({ navigation, route: {
    params: {
        data
    } }
}) => {

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
                <Text>{JSON.stringify(data)}</Text>
            </View>
        </MainHeaderContainer>
    );
};

export default DetailPost;
