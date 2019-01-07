import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ChatScreen from '../screens/MainAppScreen/ChatScreen';

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
