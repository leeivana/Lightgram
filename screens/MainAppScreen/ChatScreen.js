import React, { Component } from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import { inject } from 'mobx-react';
import { getConvo, basicUserQuery } from '../../src/graphql/queries';
import { onCreateMessage } from '../../src/graphql/subscriptions';
import { CreateConvoLink } from '../../src/graphql/mutations';

@inject('userStore')
class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).title || 'Chat',
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
    conversationId: '',
  };

  // Updates messages
  async componentDidMount() {
    const newMessageArray = [];
    const { messages } = this.state;
    const listConvos = await API.graphql(graphqlOperation(this.listUsers()));
    const allConversations = listConvos.data.listUsers.items;
    allConversations.map(async el => {
      if (el.conversations.items.length > 0) {
        el.conversations.items.forEach(item => {
          if (
            item.conversation.members.includes(
              this.props.userStore.user.phone_number
            )
          ) {
            this.setState({
              conversationId: item.conversation.id,
            });
          }
        });
      } else {
        const conversationData = await API.graphql(
          graphqlOperation(this.createConvo())
        );
        const convoId = conversationData.data.createConvo.id;
        const contactId = listConvos.data.listUsers.items[0].id;
        this.setState({
          conversationId: convoId,
        });
        console.log(this.props.userStore.user.id);
        const user1 = await API.graphql(
          graphqlOperation(
            this.createConvoLink(this.props.userStore.user.id, convoId)
          )
        );
        const user2 = await API.graphql(
          graphqlOperation(this.createConvoLink(contactId, convoId))
        );
        // const user2 = await API.graphql(graphqlOperation(this.createConvoLink(convoId)));
        console.log('exists');
      }
    });
    try {
      API.graphql(
        graphqlOperation(onCreateMessage, {
          messageConversationId: this.state.conversationId,
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
    const messageData = await API.graphql(
      graphqlOperation(getConvo, { id: this.state.conversationId })
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
  }

  createConvo = () => {
    const CreateConvo = `
    mutation CreateConvo{
      createConvo(input: {
        name: "${this.props.userStore.contact.given_name}"
        members: ["${this.props.userStore.user.phone_number}", "${
      this.props.userStore.contact.phone_number
    }"]
        isEncrypted: false
      }) {
        id
        name
        members
        isEncrypted
      }
    }
    `;
    return CreateConvo;
  };

  createConvoLink = (userId, convoId) => {
    const createConvoLink = `
    mutation CreateConvoLink{
      createConvoLink(input: {
        convoLinkUserId: "${userId}"
        convoLinkConversationId: "${convoId}"
      }){
        id
        convoLinkUserId
        convoLinkConversationId
      }
    }
    `;
    return createConvoLink;
  };

  createMessage = () => {
    const CreateMessage = `
      mutation($content: String!){
        createMessage(input: {
          content: $content
          authorId: "${this.props.userStore.user.id}"
          messageConversationId: "${this.state.conversationId}"
        }){
          authorId content isSent messageConversationId createdAt id
          author {
            given_name
        }
      }
    }
    `;
    return CreateMessage;
  };

  listUsers = () => {
    const GetConvos = `
    query list{
      listUsers(filter: {
        phone_number: {
          contains: "${this.props.userStore.contact.phone_number}"
        }
      }){
        items {
          id
          conversations {
            items {
              conversation{
                members
                id
              }
            }
          }
        }
      }
    }
    `;
    return GetConvos;
  };

  onSend = async (messages = []) => {
    if (messages === []) return;
    const { text } = messages[0];
    console.log(text);
    try {
      await API.graphql(
        graphqlOperation(this.createMessage(), { content: text })
      );
      console.log('sent');
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
