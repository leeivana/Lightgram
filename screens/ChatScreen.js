import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage,
} from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';

// mutation to create messages given a certain chatid
// query for all messages given a certain chatid 
// subscription for new messages in the chat 

//replace id with id of specific conversation 
const ListMessages = `
query list{
  getConvo(id: "a195a3ad-d953-4fb6-a26b-19ebb94eeaf9"){
    messages {
      items{
        content
        author{
          given_name
        }
        id
        authorId
        createdAt
      }
    }
  }
}
`;

const CreateMessage = ``

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).first_name || 'Chat',
    headerLeft: (
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('Chats');
        }}
      />
    ),
  });

  state = {
    messages: [],
  };

  //Updates messages 
  async componentDidMount() {
    const messageData = await API.graphql(graphqlOperation(ListMessages)); 
    const allMessages = messageData.data.getConvo.messages.items;
    console.log('all messages', allMessages);
    allMessages.forEach(el => {
      let newMessage = {_id: el.id, 
        text: el.content,
        createdAt: el.createdAt,
        user: {
          _id: el.authorId,
          name: el.author['given_name'],
        }
      }; 
      this.setState(currentState => ({
        messages: [
          newMessage, ...this.state.messages
        ]
      }))
    })
    // console.log('State', this.state.messages);
  }

  //SETSTATE NOTES 
  // Should be an array of objects that follow this format:
  // id for message
  // text - content 
  // new date 
  //user info - user id , user name, avatar (OBJECT)

  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello :)',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default withNavigation(ChatScreen);
