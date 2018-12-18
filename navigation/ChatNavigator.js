import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  TabNavigator,
} from 'react-navigation';

import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';

const ChatNavigator = TabNavigator({
  ChatList: {
    screen: ChatListScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
});

const ChatScreenStack = createStackNavigator({
  Chats: ChatScreen,
});
ChatScreenStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};

export default ChatScreenStack;
