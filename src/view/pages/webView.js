import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { colors } from '../../styles';
import { WebView } from 'react-native-webview';
import { WebViewSkelleton } from '../../components/skelleton';

const WebViewPage = ({ navigation, route: {
    params: {
        link
    } } }) => {

    const [load, setLoad] = useState(false)

    return (
        <>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={colors.dark}
            />
            {
                !load ? (
                    <View style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: colors.primary
                    }}>
                        <WebViewSkelleton />
                    </View>
                ) : null
            }
            <WebView
                onLoadEnd={() => {
                    setLoad(true)
                }}
                source={{ uri: link }}
            />
        </>
    );
};

export default WebViewPage;
