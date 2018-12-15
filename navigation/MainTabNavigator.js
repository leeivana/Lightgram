// import React from 'react';
// import { Platform } from 'react-native';
// import {
//   createStackNavigator,
//   createBottomTabNavigator,
// } from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
// import ContactsScreen from '../screens/ContactsScreen';
// import ChatsScreen from '../screens/ChatsScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// const HomeStack = createStackNavigator({
//   Home: ContactsScreen,
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Contacts',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const LinksStack = createStackNavigator({
//   Links: ChatsScreen,
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Chats',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

// export default createBottomTabNavigator({
//   HomeStack,
//   LinksStack,
//   SettingsStack,
// });
