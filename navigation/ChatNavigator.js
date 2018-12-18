import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  TabNavigator,
} from 'react-navigation';

import ChatScreen from '../screens/ChatScreen';
import ChatsListScreen from '../screens/ChatListScreen';

const ChatScreenStack = createStackNavigator({
  Chat: ChatScreen,
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
