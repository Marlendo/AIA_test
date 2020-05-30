import React from 'react';
import { useTracked } from '../service';
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { textStyle, colors } from '../styles';
import { IconButton, Card } from 'react-native-paper';
import { Space } from './containers';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export const PostCard = ({ payload, onClick, setFavorite, favorite }) => {

    const title = payload.title;
    const image = payload.media.m;
    const date = payload.published;
    const author = payload.author;    

    const [state, action] = useTracked();

    // function updateData(newFavorite, newPost) {
    //     action({
    //         type: 'setFavorite',
    //         data: newFavorite
    //     })
    //     action({
    //         type: 'setPost',
    //         data: newPost
    //     })
    //     AsyncStorage.setItem('favorite', JSON.stringify(newFavorite))
    // }

    // async function setFavorite() {
    //     let post = [...state.post];
    //     let favorite = state.favorite;
    //     if (payload.favorite) {
    //         removeFavorite(favorite, post)
    //     } else {
    //         let newFavorite = [...favorite, payload];
    //         post[index].favorite = true;
    //         action({
    //             type: 'successAlert',
    //             message: 'Success Added'
    //         })
    //         updateData(newFavorite, post)
    //     }
    // }

    // const removeFavorite = (favorite, post) => {
    //     Alert.alert(
    //         "Alert",
    //         "Are You Sure Want to Remove " + title + " From Favorite",
    //         [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => {
    //                     console.log(cancel)
    //                 },
    //                 style: "cancel"
    //             },
    //             {
    //                 text: "OK", onPress: () => {
    //                     let newFavorite = favorite.filter(function (rows) {
    //                         return rows.link !== payload.link
    //                     });
    //                     post[index].favorite = false
    //                     updateData(newFavorite, post)
    //                 }
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // }

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
                    <View style={{
                        position: 'absolute',
                        backgroundColor: colors.lightL,
                        borderRadius: 100,
                        right: 10,
                        top: -50
                    }}>
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