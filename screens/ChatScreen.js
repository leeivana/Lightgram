import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  textStyle: {
    paddingTop: 100,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  render() {
    return (
      <View style={styles.textStyle}>
        <Text>Hi</Text>
      </View>
    );
  }
}

export default ChatScreen;
