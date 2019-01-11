import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Content,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
} from 'native-base';
import { inject } from 'mobx-react';
import Chat from '../../components/Chat';
import { create } from '../../assets/images';
@inject('userStore')
export default class ChatsListScreen extends React.Component {
  state = {
    chats: [],
  };

  async componentDidMount() {
    const listChat = this.listChats();
    const { chats } = this.state;
    const chatsData = await API.graphql(graphqlOperation(listChat));
    const numberOfChats = chatsData.data.getUser.conversations.items;
    this.setState({ chats: [...numberOfChats, ...chats] });
  }

  renderItem = async arg => {
    try {
      await this.props.userStore.updateContact(arg);
      this.props.navigation.navigate('Chat');
    } catch (e) {
      console.error(e);
    }
  };

  listChats = () => {
    const ListChats = `
    query list{
      getUser(id:"${this.props.userStore.user.id}") {
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
    return ListChats;
  };

  render() {
    const { chats } = this.state;
    const { container } = styles;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Text>Edit</Text>
            </Button>
          </Left>
          <Body>
            <Title>Chats</Title>
          </Body>
          <Right>
            <Button transparent>
              <Image style={{ width: 28, height: 28 }} />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={container}>
            <ScrollView>
              {chats.map(el => {
                const { id, name, messages, members } = el.conversation;
                const { items } = messages;
                return (
                  items.length !== 0 && (
                    <Chat
                      key={id}
                      conversationName={name}
                      members={members}
                      onPress={() => {
                        const phoneNumber = members.filter(
                          el => el !== this.props.userStore.user.phone_number
                        );
                        this.renderItem({ phone_number: phoneNumber[0] });
                      }}
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
        </Content>
      </Container>
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
