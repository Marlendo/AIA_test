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
    const [load, setLoad] = useState(false);
    const [post, setPost] = useState([]);

    async function getData() {
        setLoad(true)
        const data = await flickrApi('public')
        if (data) {
            setLoad(false)
            setPost(data.items)
        }
    }

    useEffect(() => {
        getData()
    }, []);

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
            {
                load ? (
                    <PostCardSkelleton load={load} />
                ) : (
                        <FlatList
                            data={post}
                            renderItem={({ item }) => (
                                <PostCard
                                    title={item.title}
                                    link={item.link}
                                    image={item.media.m}
                                    date={item.published}
                                    desc={item.description}
                                    author={item.author}
                                    tags={item.tags}
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
