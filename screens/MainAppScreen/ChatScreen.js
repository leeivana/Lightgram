import React, { Component } from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import { inject } from 'mobx-react';
import { getConvo, basicUserQuery } from '../../src/graphql/queries';
import { onCreateMessage } from '../../src/graphql/subscriptions';

const CreateMessage = `
  mutation($content: String!){
    createMessage(input: {
      content: $content
      authorId: "9c570049-788c-4bfe-93ea-0c645df4af73"
      messageConversationId: "28ff8871-d4d7-4620-8294-34c3ffa0b8ad"
    }){
      authorId content isSent messageConversationId createdAt id
      author {
        given_name
      }
    }
  }
`;
@inject('userStore')
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

  // Updates messages
  async componentDidMount() {
    const newMessageArray = [];
    const { messages } = this.state;
    const messageData = await API.graphql(
      graphqlOperation(getConvo, { id: '28ff8871-d4d7-4620-8294-34c3ffa0b8ad' })
    );
    const allMessages = messageData.data.getConvo.messages.items;
    try {
      await Promise.all(
        allMessages.map(async el => {
          el.isSent = true;
          const { id, content, createdAt, authorId } = el;
          const newMessage = {
            _id: id,
            text: content,
            createdAt,
            user: {
              _id: authorId,
              name: '',
            },
          };
          const payload = await API.graphql(
            graphqlOperation(basicUserQuery, { id: authorId })
          );
          const givenName = payload.data.getUser.given_name;
          newMessage.user.name = givenName;
          newMessageArray.push(newMessage);
          newMessageArray.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        })
      );
      this.setState({ messages: newMessageArray });
    } catch (e) {
      console.error(e);
    }
    try {
      API.graphql(
        graphqlOperation(onCreateMessage, {
          messageConversationId: '28ff8871-d4d7-4620-8294-34c3ffa0b8ad',
        })
      ).subscribe({
        next: eventData => {
          const {
            id,
            content,
            authorId,
            messageConversationId,
            createdAt,
            author,
          } = eventData.value.data.onCreateMessage;
          const { given_name } = author;
          const messageObj = {
            createdAt,
            _id: id,
            text: content,
            user: {
              _id: authorId,
              name: given_name,
            },
          };
          const messageArray = [
            messageObj,
            ...this.state.messages.filter(i => i._id !== messageObj._id),
          ];
          this.setState({ messages: messageArray });
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  onSend = async (messages = []) => {
    if (messages === []) return;
    const { text } = messages[0];
    try {
      await API.graphql(graphqlOperation(CreateMessage, { content: text }));
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { messages } = this.state;
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{
          // id of current user
          _id: this.props.userStore.user.id,
        }}
      />
    );
  }
}

export default withNavigation(ChatScreen);
