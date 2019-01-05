import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
  });

  render() {
    return (
      <View>
        <Button>
          <Text>Log Out</Text>
        </Button>
      </View>
    );
  }
}
