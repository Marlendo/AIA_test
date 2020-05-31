import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { textStyle, colors, containerStyle } from '../styles';
import { IconButton, Card } from 'react-native-paper';
import { Space } from './containers';
import moment from 'moment';

export const PostCard = ({ payload, onClick, setFavorite, favorite }) => {

    const title = payload.title;
    const image = payload.media.m;
    const date = payload.published;
    const author = payload.author;    

    return (
        <TouchableOpacity
            onPress={onClick}
            style={{
                paddingHorizontal: 20,
                paddingVertical: 5
            }}
        >
            <Card>
                <Card.Content>
                    <Text numberOfLines={2} style={textStyle.title}>{title}</Text>
                </Card.Content>
                <Space size={10} />
                <Card.Cover style={{
                    height: 200
                }} source={{ uri: image }} />
                <Space size={10} />
                <Card.Content>
                    <View style={containerStyle.favorite}>
                        <IconButton
                            icon={favorite ? 'heart' : 'heart-outline'}
                            color={favorite ? colors.secondary : colors.grey}
                            size={40}
                            style={{
                                margin: 0
                            }}
                            onPress={() => {
                                setFavorite()
                            }}
                        />
                    </View>
                    <Text numberOfLines={1} style={[
                        textStyle.subTitle,
                        {
                            color: colors.grey
                        }
                    ]}>Posted By : </Text>
                    <Text numberOfLines={1} style={[
                        textStyle.subTitle,
                        {
                            color: colors.grey
                        }
                    ]}>{author}</Text>
                    <Text numberOfLines={1} style={[
                        textStyle.subTitle,
                        {
                            color: colors.grey
                        }
                    ]}>On {moment(date).format('DD/MM/yyyy')}</Text>

                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

export const LoginFirst = () => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{
                    height: 100,
                    width: 100
                }}
                source={require('../../assets/images/login.png')}
            />
            <View>
                <Text style={[
                    textStyle.title,
                    {
                        textAlign: 'center',
                        color: colors.primaryD,
                        fontSize: 30,
                        marginTop: 5
                    }
                ]}>Login First</Text>
            </View>
        </View>
    )
}

export const NotifNull = () => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{
                    height: 100,
                    width: 100
                }}
                source={require('../../assets/images/notification.png')}
            />
            <View>
                <Text style={[
                    textStyle.title,
                    {
                        textAlign: 'center',
                        color: colors.primaryD,
                        fontSize: 30,
                        marginTop: 5
                    }
                ]}>Notification Not Found</Text>
            </View>
        </View>
    )
}

export const FavoriteNull = () => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{
                    height: 100,
                    width: 100
                }}
                source={require('../../assets/images/heart.png')}
            />
            <View>
                <Text style={[
                    textStyle.title,
                    {
                        textAlign: 'center',
                        color: colors.primaryD,
                        fontSize: 30,
                        marginTop: 5
                    }
                ]}>No Favorite Added</Text>
            </View>
        </View>
    )
}