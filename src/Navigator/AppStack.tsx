import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import DetailProfileScreen from '../DetailProfile/DetailProfile.Screen';
import DetailFollowerScreen from '../DetailFollower/DetailFollower.Screen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Drawer'}>
      <Stack.Screen name="Drawer" component={AppDrawer} />
      <Stack.Screen
        name="DetailProfileScreen"
        component={DetailProfileScreen}
      />
      <Stack.Screen
        name="DetailFollowerScreen"
        component={DetailFollowerScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
