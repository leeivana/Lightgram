import React from 'react';

import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors } from '../constants/Styling';

import ContactsScreen from '../screens/MainAppScreen/ContactsScreen';
import ChatsListScreen from '../screens/MainAppScreen/ChatListScreen';
import SettingsScreen from '../screens/MainAppScreen/SettingsScreen';

import { contacts, chats, settings } from '../assets/images';

const Tabs = {
  ContactsScreen: {
    screen: ContactsScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={contacts} style={{ width: 28, height: 28, tintColor }} />
      ),
    }),
  },
  ChatsListScreen: {
    screen: ChatsListScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={chats} style={{ width: 28, height: 28, tintColor }} />
      ),
    }),
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Image source={settings} style={{ width: 28, height: 28, tintColor }} />
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

const MainAppNavigator = createBottomTabNavigator(Tabs, config);

export default MainAppNavigator;
