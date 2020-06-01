import React, { useState, useEffect } from 'react';
import { FlatList, Alert, RefreshControl } from 'react-native';
import { useTracked } from '../../service';
import { flickrApi } from '../../service/api';
import { MainHeaderContainer, Space } from '../../components/containers';
import { colors } from '../../styles';
import { PostCard } from '../../components/card';
import { PostCardSkelleton } from '../../components/skelleton';
import { Appbar } from 'react-native-paper';
import { paginate } from '../../helper/paginate';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchComponent } from '../../components/input';

const Home = ({ navigation }) => {

    const [state, action] = useTracked();
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState('');
    const [searchToogle, setSearchToogle] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function getData(refresher) {
        setLoad(true)
        if(refresher){
            setRefreshing(true)
            setPage(1)
        }
        const data = await flickrApi('public')
        if (data) {
            setLoad(false)
            if(refresher){
                setRefreshing(false)
            }
            setData(data.items)
            setPost(paginate(data.items, page))
        }
    }

    // client side searching data
    function doSearch(value) {
        setPage(1)
        let newPost = data.filter(function (rows) {
            return rows.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        });
        setPost(newPost)
    }
    function clearSearch() {
        setPage(1)
        setSearchToogle(false)
        setPost(paginate(data, 1))
    }

    // client side pagination data
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
    // end of favorite management

    useEffect(() => {
        getData(false)
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
                    <SearchComponent
                        onChangeText={(e) => {
                            setSearch(e)
                            if (e.length === 0) {
                                clearSearch()
                            } else {
                                doSearch(e)
                            }
                        }}
                        onBlur={() => {
                            setSearchToogle(false)
                        }}
                        value={search} />
                ) : (
                        null
                    )
            }
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
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={()=> {
                                        getData(true)
                                    }}
                                />
                            }
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (!searchToogle) {
                                    doPaginate()
                                }
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
