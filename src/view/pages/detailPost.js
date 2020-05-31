import React from 'react';
import { useTracked } from '../../service';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { colors, textStyle } from '../../styles';
import { Space } from '../../components/containers';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { Chip, Button } from 'react-native-paper';
import HTML from 'react-native-render-html';

const DetailPost = ({ navigation, route: {
    params: {
        data
    } }
}) => {

    const [state, action] = useTracked();
    const SCREEN_HEIGHT = Dimensions.get('screen').height;
    const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
    const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
    const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        contentContainer: {
            flexGrow: 1,
        },
        navContainer: {
            height: HEADER_HEIGHT,
            marginHorizontal: 10,
        },
        statusBar: {
            height: STATUS_BAR_HEIGHT,
            backgroundColor: 'transparent',
        },
        navBar: {
            height: NAV_BAR_HEIGHT,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'transparent',
        }
    });

    function getTitle() {
        const title = data.title.toString().split(' ');
        if (title.length > 2) {
            return title[0] + ' ' + title[1]
        } else {
            return data.title.length < 2 ? data.author : data.title
        }
    }

    function getTags() {
        const tags = data.tags.split(' ');
        if (tags.length > 1) {
            if (tags[0].length < 2) {
                return false
            } else {
                return tags
            }
        } else {
            return false
        }
    }

    // favorite management
    function isFavorite() {
        let favorite = state.favorite;
        let getFavorite = favorite.filter(function (rows) {
            return rows.link === data.link
        });
        if (getFavorite.length !== 0) {
            return true
        } else {
            return false
        }
    }
    function updateData(newFavorite) {
        action({
            type: 'setFavorite',
            data: newFavorite
        })
        AsyncStorage.setItem('favorite', JSON.stringify(newFavorite))
    }
    async function setFavorite() {
        let favorite = state.favorite;
        if (isFavorite(data)) {
            removeFavorite(data)
        } else {
            let newFavorite = [...favorite, data];
            action({
                type: 'successAlert',
                message: 'Success Added'
            })
            updateData(newFavorite)
        }
    }
    const removeFavorite = (payload) => {
        let favorite = state.favorite;
        Alert.alert(
            "Alert",
            "Are You Sure Want to Remove " + payload.title + " From Favorite",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log(cancel)
                    },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        let newFavorite = favorite.filter(function (rows) {
                            return rows.link !== payload.link
                        });
                        updateData(newFavorite)
                    }
                }
            ],
            { cancelable: false }
        );
    }
    // end of favorite management

    const renderNavBar = () => {
        return (
            <View style={styles.navContainer}>
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.iconLeft} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Icon name="md-arrow-back" size={25} color={colors.light} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconRight} onPress={() => {
                        setFavorite()
                    }}>
                        <Icon
                            name="ios-heart"
                            size={50}
                            color={
                                isFavorite() ? colors.secondary : colors.greyL
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <View style={{
                padding: 15
            }}>
                <Text style={[
                    textStyle.title,
                    {
                        fontSize: 20
                    }
                ]}>{data.title.length < 2 ? 'Image Post' : data.title}</Text>
                <Text style={[
                    textStyle.subTitle,
                    {
                        color: colors.grey
                    }
                ]}>Posted By : {data.author}</Text>
                <Text style={[
                    textStyle.subTitle,
                    {
                        color: colors.grey
                    }
                ]}>Date Posted : {moment(data.published).format('DD/MM/yyyy')}</Text>
                <View style={{
                    padding: 10
                }}>
                    <Text style={textStyle.subTitle}>Description :</Text>
                    <HTML html={data.description} imagesMaxWidth={Dimensions.get('window').width} />
                </View>
                <Text style={[
                    textStyle.subTitle,
                    {
                        color: colors.grey,
                        margin: 10
                    }
                ]}>Tags :</Text>
                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    {
                        getTags() ?
                            getTags().map((row, i) => (
                                <Chip
                                    key={i.toString()}
                                    mode={'outlined'}
                                    style={{
                                        margin: 2
                                    }}
                                    onPress={() => {
                                        console.log('Pressed')
                                    }}>
                                    {
                                        row
                                    }
                                </Chip>
                            )) : (
                                <Text style={[
                                    textStyle.subTitle,
                                    {
                                        color: colors.grey
                                    }
                                ]}>Tags Not Found</Text>
                            )
                    }
                </View>
                <Space size={30} />
                <Button
                    mode="contained"
                    onPress={() => {
                        navigation.navigate('WebView', {                            
                            link: data.link
                        });
                    }}>
                    visit page
                    </Button>
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <ReactNativeParallaxHeader
                headerMinHeight={HEADER_HEIGHT}
                headerMaxHeight={300}
                extraScrollHeight={20}
                navbarColor="#3498db"
                title={getTitle()}
                titleStyle={textStyle.title}
                backgroundImage={{
                    uri: data.media.m
                }}
                backgroundImageScale={1.2}
                renderNavBar={renderNavBar}
                renderContent={renderContent}
                containerStyle={styles.container}
                contentContainerStyle={styles.contentContainer}
                innerContainerStyle={styles.container}
            // scrollViewProps={{
            //     onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
            //     onScrollEndDrag: () => console.log('onScrollEndDrag'),
            // }}
            />
        </View>
    );
};

export default DetailPost;
