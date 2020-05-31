import React from 'react';
import { View, StatusBar } from 'react-native';
import { MainHeaderContainer } from '../../components/containers';
import { colors } from '../../styles';
import { NotifNull } from '../../components/card';

const NotifPage = ({ navigation }) => {

    return (
        <MainHeaderContainer
            barColor={colors.whatsapp}
            title={'Notification'}
            notif={false}
            back
        >
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={colors.whatsapp}
            />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <NotifNull />
            </View>
        </MainHeaderContainer>
    );
};

export default NotifPage;
