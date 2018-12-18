import React from 'react';
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chats from '../components/Chat';

export default class ChatsListScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Chats',
    headerRight: (
      <Button
        title="Compose"
        onPress={() => {
          console.log('yes');
        }}
      />
    ),
    headerLeft: (
      <Button
        title="Edit"
        onPress={() => {
          console.log('yes');
        }}
      />
    ),
  });

  state = {
    chats: [],
  };

  componentDidMount() {
    // ToDo
    // Set Up database with chat lists and chats on aws
    // Set data from back end to front end
    // Display data on front end
  }

  render() {
    const { chats } = this.state;
    const { container } = styles;
    return (
      <View style={container}>
        <ScrollView>
          <Chats
            first_name="Joe"
            last_name="Pham"
            time=""
            content="NOOOOOOOO!"
            src=""
          />
          <Chats
            first_name="Ivana"
            last_name="Lee"
            time=""
            content="I love this app"
            src=""
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  topBit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#075e54',
    justifyContent: 'space-between',
  },
});
