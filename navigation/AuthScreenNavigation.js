import React from 'react';

import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors } from '../constants/Styling';
import SignUpScreen from '../screens/AuthScreen/SignUpScreen';
import SignInScreen from '../screens/AuthScreen/SignInScreen';
import { signIn, signUp } from '../assets/images';

const Tabs = {
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={signIn} style={{ width: 28, height: 28, tintColor }} />
      ),
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={signUp} style={{ width: 28, height: 28, tintColor }} />
      ),
    }),
  },
};

const config = {
  tabBarOptions: {
    activeTintColor: colors.primary,
    style: {
      backgroundColor: '#fafafa',
      borderTopWidth: 0,
    },
  },
};

const AuthNav = createBottomTabNavigator(Tabs, config);

export default AuthNav;
