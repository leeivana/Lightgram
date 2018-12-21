import React from 'react';
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API, graphqlOperation } from 'aws-amplify';
import Chats from '../components/Chat';

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
    const chats = await API.graphql(graphqlOperation(ListChats));
    this.setState({ chats: [chats.data.getUser] });
    console.log(this.state.chats);
    this.state.chats.conversations.items.forEach(el => {
      console.log(el.conversation.name);
    });
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <ScrollView>
          {/* {this.state.chats.map((c, i) => (
            <div key={i}>
              <Chats content={c.name} />
            </div>
          ))} */}
          <Chats
            first_name="Serhii"
            last_name="Panchyshyn"
            time=""
            content="JavaScript for life!"
            src=""
          />
          <Chats
            first_name="Tony"
            last_name="Lachmaniucu"
            time=""
            content="I am gonna make best AI ever"
            src=""
          />
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
