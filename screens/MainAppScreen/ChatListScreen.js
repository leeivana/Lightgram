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
  Icon,
  Title,
  Text,
} from 'native-base';
import Chat from '../../components/Chat';
import { create } from '../../assets/images';

const ListChats = `
query list{
  getUser(id:"1bb5da27-3471-475f-8968-a43c4403f8c5") {
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
              <Image source={create} style={{ width: 28, height: 28 }} />
            </Button>
          </Right>
        </Header>
        <Content>
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
