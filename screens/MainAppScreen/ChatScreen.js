import React, { Component } from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import { getConvo, basicUserQuery } from '../../src/graphql/queries';
import { onCreateMessage } from '../../src/graphql/subscriptions';

const CreateMessage = `
  mutation($content: String!){
    createMessage(input: {
      content: $content
      authorId: "9c570049-788c-4bfe-93ea-0c645df4af73"
      messageConversationId: "a195a3ad-d953-4fb6-a26b-19ebb94eeaf9"
    }){
      authorId content isSent messageConversationId createdAt
    }
  }
`;

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).first_name || 'Chat',
    headerLeft: (
      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('ChatsListScreen');
        }}
      />
    ),
  });

  state = {
    messages: [],
  };

  // Updates messages
  async componentDidMount() {
    const messageData = await API.graphql(
      graphqlOperation(getConvo, { id: '28ff8871-d4d7-4620-8294-34c3ffa0b8ad' })
    );
    const allMessages = messageData.data.getConvo.messages.items;
    allMessages.forEach(el => {
      const { messages } = this.state;
      const { id, content, createdAt, authorId } = el;
      // const { given_name } = el.author;
      const newMessage = {
        _id: id,
        text: content,
        createdAt,
        user: {
          _id: authorId,
          name: '',
        },
      };

      (async () => {
        const payload = await API.graphql(
          graphqlOperation(basicUserQuery, { id: authorId })
        );
        console.log('payload', payload);
        const givenName = payload.data.getUser.given_name;
        newMessage.user.name = givenName;
        console.log('obj', newMessage);
      })().then(
        this.setState({
          messages: [newMessage, ...messages],
        })
      );
      console.log('state', this.state.messages);
    });
    API.graphql(
      graphqlOperation(onCreateMessage, {
        messageConversationId: 'a195a3ad-d953-4fb6-a26b-19ebb94eeaf9',
      })
    ).subscribe({
      next: eventData => {
        const message = eventData.value.data.onCreateMessage;
        const { id, content, authorId } = message;
        console.log(id, content, authorId);
        const messageObj = {
          _id: message.id,
          text: content,
          user: {
            _id: authorId,
          },
        };
        const messageArray = [
          ...this.state.messages.filter(
            i => i.messageConversationId !== message.messageConversationId
          ),
          messageObj,
        ];
        console.log('message array', messageArray);
        this.setState({ messages: messageArray });
      },
    });
  }

  onSend = async (messages = []) => {
    if (messages === []) return;
    const { text } = messages[0];
    try {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      await API.graphql(graphqlOperation(CreateMessage, { content: text }));
      console.log('success');
    } catch (err) {
      console.log('error', err);
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
          _id: '9c570049-788c-4bfe-93ea-0c645df4af73',
        }}
      />
    );
  }
}

export default withNavigation(ChatScreen);
