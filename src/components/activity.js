import React from 'react';
import { colors } from '../styles';
import { useTracked } from '../service';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import SnackBar from 'react-native-snackbar-component';

export const Activity = (props) => {
    const [state, action] = useTracked();

    const snackbarActive = state.alert.active;
    const snackbarType = state.alert.snackbarType;
    const snackbarMessage = state.alert.message;
    const loading = state.loading;

    return (
        <>
            <SnackBar
                visible={snackbarActive}
                textMessage={snackbarMessage}
                actionHandler={() => {
                    action({ type: 'closeAlert' })
                }}
                backgroundColor={snackbarType === 'Error' ? colors.danger : snackbarType === 'Warning' ? colors.warning : colors.primary}
                messageColor={colors.light}
                position={'bottom'}
                actionText="Ok"
            />
            {loading ? (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <ActivityIndicator animating={loading} color={'#D6463A'} size={40} />
                    </View>
                </View>
            ) : (
                    null
                )}
        </>
    );
};