import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';

const Tabs = TabNavigator({
  ChatList: {
    screen: ChatListScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
});
