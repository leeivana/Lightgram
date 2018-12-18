import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
  });

  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}
