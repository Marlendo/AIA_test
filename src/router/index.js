import React from 'react';
import { navigationRef } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import DetailPost from '../view/pages/detailPost';

const Stack = createStackNavigator();

const MainRoot = () => {

    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={'Tabs'}
          headerMode="none"
        >         
          <Stack.Screen name="DetailPost" component={DetailPost} />         
          <Stack.Screen name="Tabs" component={MyTabs} />         
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}

export default MainRoot;