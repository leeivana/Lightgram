import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';

import MainTabNavigator from './MainTabNavigator';

import ChatScreenStack from './ChatNavigator';

const AuthStack = createStackNavigator({ LoginScreen });

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Chat: ChatScreenStack,
});
