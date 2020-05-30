import React, { useState, useEffect } from 'react';
import { useTracked } from '../service';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../view/tabs/home';
import MyPost from '../view/tabs/myPost';
import SavedPost from '../view/tabs/favorite';
import Profile from '../view/tabs/profile';
import { StatusBar } from 'react-native';
import { colors } from '../styles';
import { containerStyle } from '../styles';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {

  const [state, action] = useTracked();
  const [bar, setBar] = useState(true)

  async function getFavorite() {
    const data = JSON.parse(await AsyncStorage.getItem('favorite'))
    if (data) {      
      action({
        type: 'setFavorite',
        data: data
      })
    } else {
      await AsyncStorage.removeItem('favorite')
    }
  }

  useEffect(() => {
    getFavorite()
  }, [])

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={bar ? colors.primaryD : colors.secondaryD}
      />
      <Tab.Navigator
        activeColor={
          colors.light
        }
        shifting={true}
        barStyle={{
          backgroundColor: colors.secondary
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          listeners={{
            tabPress: e => {
              setBar(true)
            },
          }}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => {
              return (
                <Icon
                  name="ios-home"
                  size={30}
                  style={containerStyle.tabsIcon}
                  color={colors.light}
                />
              )
            },
            tabBarColor: colors.primaryD,
          }}
        />
        <Tab.Screen
          name="TabOrder"
          component={MyPost}
          listeners={{
            tabPress: e => {
              setBar(false)
            },
          }}
          options={{
            tabBarLabel: 'Its Me',
            tabBarIcon: () => {
              return (
                <Icon
                  name="md-images"
                  size={30}
                  style={containerStyle.tabsIcon}
                  color={colors.light}
                />
              )
            },
            tabBarColor: colors.secondaryD
          }}
        />
        <Tab.Screen
          name="TabHelp"
          component={SavedPost}
          listeners={{
            tabPress: e => {
              setBar(true)
            },
          }}
          options={{
            tabBarLabel: 'My Favorite',
            tabBarIcon: () => {
              return (
                <Icon
                  name="ios-heart"
                  size={30}
                  style={containerStyle.tabsIcon}
                  color={colors.light}
                />
              )
            },
            tabBarColor: colors.primaryD
          }}
        />
        <Tab.Screen
          name="TabProfile"
          component={Profile}
          listeners={{
            tabPress: e => {
              setBar(false)
            },
          }}
          options={{
            tabBarLabel: 'My Profile',
            tabBarIcon: () => {
              return (
                <Icon
                  name="ios-person"
                  size={30}
                  style={containerStyle.tabsIcon}
                  color={colors.light}
                />
              )
            },
            tabBarColor: colors.secondaryD
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MyTabs;