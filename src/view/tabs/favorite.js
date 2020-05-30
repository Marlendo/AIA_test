import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useTracked } from '../../service';
import { flickrApi } from '../../service/api';
import { MainHeaderContainer, Space } from '../../components/containers';
import { colors } from '../../styles';
import { PostCard } from '../../components/card';
import { PostCardSkelleton } from '../../components/skelleton';
import { Appbar } from 'react-native-paper';

const Home = ({ navigation }) => {

    const [state, action] = useTracked();

    return (
        <MainHeaderContainer
            barColor={colors.primaryD}
            title={'Saved Post'}
            right={(
                <Appbar.Action
                    icon="magnify"
                    color={colors.light}
                    onPress={() => {
                        alert('sip')
                    }} />
            )}
        >
            <Space size={20} />
            <FlatList
                data={state.favorite}
                renderItem={({ item, index }) => (
                    <PostCard
                        index={index}
                        payload={item}
                        onClick={() => {
                            navigation.navigate('DetailPost', {
                                data: item
                            });
                        }}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </MainHeaderContainer>
    );
};

export default Home;
