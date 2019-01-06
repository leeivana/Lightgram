import React from 'react';
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Chat from '../../components/Chat';

const ListChats = `
query list{
  getUser(id:"f2a01b44-8631-4576-923b-ff13eccf8226") {
    conversations {
      items {
        conversation {
          messages {
          	items {
              content
            }
          }
          id
          name
          members 
        }
      }
    }
  }
}
`;
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

  async componentDidMount() {
    const { chats } = this.state;
    const chatsData = await API.graphql(graphqlOperation(ListChats));
    const numberOfChats = chatsData.data.getUser.conversations.items;
    this.setState({ chats: [...numberOfChats, ...chats] });
  }

  render() {
    const { chats } = this.state;
    const { container } = styles;
    return (
      <View style={container}>
        <ScrollView>
          {chats.map(el => {
            const { id, name, messages } = el.conversation;
            const { items } = messages;
            console.log(items);

            return (
              items.length !== 0 && (
                <Chat
                  key={id}
                  conversationName={name}
                  content={
                    items[items.length - 1]
                      ? items[items.length - 1].content
                      : ''
                  }
                />
              )
            );
          })}
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
