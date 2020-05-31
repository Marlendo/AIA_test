import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useTracked } from '../../service';
import { MainHeaderContainer, Space } from '../../components/containers';
import { colors } from '../../styles';
import { PostCard, FavoriteNull } from '../../components/card';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchComponent } from '../../components/input';

const Home = ({ navigation }) => {

    const [state, action] = useTracked();
    const [search, setSearch] = useState('');
    const [searchToogle, setSearchToogle] = useState(false);
    const [post, setPost] = useState([])

    useEffect(() => {
        setPost(state.favorite)
    }, [])

    // client side searching data
    function doSearch(value) {
        let newPost = state.favorite.filter(function (rows) {
            return rows.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        });
        setPost(newPost)
    }
    function clearSearch() {
        setSearchToogle(false)
        setPost(state.favorite)
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

    return (
        <MainHeaderContainer
            barColor={colors.primaryD}
            title={'Saved Post'}
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
            <Space size={20} />
            {
                state.favorite.length === 0 ? (
                    <FavoriteNull />
                ) : (
                        <FlatList
                            data={search.length > 1 ? post : state.favorite}
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
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
            }
        </MainHeaderContainer>
    );
};

export default Home;
