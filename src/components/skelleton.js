import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Avatar, Card } from 'react-native-paper';
import { Space } from './containers';
import { colors } from '../styles';

const PostCardSkelletonComponent = (props) => {

    const [width, setWidth] = useState(0);

    return (
        <View style={{
            marginVertical: 5,
            marginHorizontal: 20,
            borderWidth: 2,
            borderColor: colors.greyL,
            borderRadius: 7
        }}>
            <View style={{
                height: 50
            }}>
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: 10
                    }}
                    // containerStyle={{ flex: 1, width: 300 }}
                    isLoading={props.load}
                    layout={[
                        { key: "header", width: 250, height: 20, marginBottom: 6 },
                    ]}
                    animationDirection={'horizontalRight'}
                >
                </SkeletonContent>
            </View>
            <View
                onLayout={(event) => {
                    setWidth(event.nativeEvent.layout.width)   
                }}
                style={{
                    height: 200
                }}>
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        justifyContent: 'center'                        
                    }}
                    // containerStyle={{ flex: 1, width: 300 }}
                    isLoading={props.load}
                    layout={[
                        { key: "image", width: width, height: 200, marginBottom: 6 },
                    ]}
                    animationDirection={'horizontalRight'}
                >
                </SkeletonContent>
            </View>
            <View style={{
                height: 50,
                marginTop: 10
            }}>
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: 10
                    }}
                    // containerStyle={{ flex: 1, width: 300 }}
                    isLoading={props.load}
                    layout={[
                        { key: "date", width: 100, height: 20, marginBottom: 6 },
                        { key: "author", width: 250, height: 20, marginBottom: 6 },
                    ]}
                    animationDirection={'horizontalRight'}
                >
                </SkeletonContent>
            </View>
        </View>
    )
}

export const PostCardSkelleton = (props) => {

    return (
        <View>
            <PostCardSkelletonComponent load={props.load} />
            <PostCardSkelletonComponent load={props.load} />
        </View>
    )

}