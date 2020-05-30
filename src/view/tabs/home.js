import React, { useState, useEffect } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { useTracked } from '../../service';
import { flickrApi } from '../../service/api';
import { MainHeaderContainer, Space } from '../../components/containers';
import { colors } from '../../styles';
import { PostCard } from '../../components/card';
import { PostCardSkelleton } from '../../components/skelleton';
import { Appbar, Searchbar } from 'react-native-paper';
import { getPublicPost } from '../../helper/payload';
import { paginate } from '../../helper/paginate';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ navigation }) => {

    const [state, action] = useTracked();
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState('');
    const [searchToogle, setSearchToogle] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState([])

    async function getData() {
        setLoad(true)
        const data = await flickrApi('public')
        if (data) {
            setLoad(false)
            let newData = await getPublicPost(data.items)
            setData(newData)
            setPost(paginate(newData, page))
            // action({
            //     type: 'setPost',
            //     data: newData
            // })
        }
    }

    function doPaginate() {
        const getPaginate = paginate(data, page + 1);
        if (getPaginate.length !== 0) {
            setPage(page + 1)
            let newPost = [...post, ...getPaginate]
            setPost(newPost)
        }
    }

    // favorite management

    function isFavorite(payload) {
        let favorite = state.favorite;
        let getFavorite = favorite.filter(function (rows) {
            return rows.link === payload.link
        });
        if(getFavorite.length !== 0){
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

    async function setFavorite(payload) {
        let favorite = state.favorite;
        if (isFavorite(payload)) {
            removeFavorite(payload)
        } else {
            let newFavorite = [...favorite, payload];
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

    useEffect(() => {
        getData()
    }, []);

    return (
        <MainHeaderContainer
            barColor={colors.primaryD}
            title={'Public Post'}
            right={(
                <Appbar.Action
                    icon="magnify"
                    color={colors.light}
                    onPress={() => {
                        setSearchToogle(!searchToogle)
                    }} />
            )}
        >
            {
                searchToogle ? (
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        zIndex: 3,
                        padding: 0
                    }}>
                        <Searchbar
                            autoFocus={searchToogle}
                            placeholder="Search"
                            onChangeText={(e) => {
                                setSearch(e)
                                if (e.length === 0) {
                                    setSearchToogle(false)
                                }
                            }}
                            onBlur={() => {
                                setSearchToogle(false)
                            }}
                            value={search} />
                    </View>
                ) : (
                        null
                    )
            }
            <Space size={20} />
            {
                load ? (
                    <PostCardSkelleton load={load} />
                ) : (
                        <FlatList
                            data={post}
                            renderItem={({ item, index }) => (
                                <PostCard
                                    index={index}
                                    favorite={isFavorite(item)}
                                    payload={item}
                                    onClick={() => {
                                        navigation.navigate('DetailPost', {
                                            data: item
                                        });
                                    }}
                                    setFavorite={() => {
                                        setFavorite(item)
                                    }}
                                />
                            )}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                doPaginate()
                            }}
                            initialNumToRender={4}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
            }
        </MainHeaderContainer>
    );
};

export default Home;
