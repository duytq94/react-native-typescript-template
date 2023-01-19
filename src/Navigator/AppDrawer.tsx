import React from 'react';
import ProfileScreen from '../Profile/Profile.Screen';
import FollowerScreen from '../Follower/Follower.Screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {fontFamily, fontSize} from '../const';
import colors from '../Themes/Colors';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'rgba(118,180,189,0.3)',
        drawerLabelStyle: {
          fontSize: fontSize.medium,
          fontFamily: fontFamily.regular,
          color: colors.primary,
          marginLeft: 12,
        },
      }}
      initialRouteName={'ProfileScreen'}>
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="FollowerScreen" component={FollowerScreen} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
