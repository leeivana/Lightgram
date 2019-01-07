import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Permissions, Contacts } from 'expo';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
} from 'native-base';
import ContactList from '../../components/ContactList';

const listUsers = `
query list{
  listUsers{
    items{
      given_name
      family_name
      phone_number
    }
  }
  }
  
`;
export default class ContactsScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Contacts',
    headerRight: (
      <Button
        title="Compose"
        onPress={() => {
          console.log('yes');
        }}
      />
    ),
  });

  state = {
    status: null,
    contacts: [],
    awsContacts: [],
  };

  async componentDidMount() {
    const contactData = await API.graphql(graphqlOperation(listUsers));
    const numberOfContacts = contactData.data.listUsers.items;
    this.setState({ awsContacts: [...numberOfContacts] });
    this.permissionFlow();
  }

  permissionFlow = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const contacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
      });

      this.setState({
        status,
        contacts: contacts.data,
      });
    } else {
      alert(
        'You need to enable Contacts permission. Settings > Lightgram > Contacts'
      );
      Linking.openURL('app-settings');
    }
  };

  formatPhoneNumber = () => {
    const allContacts = this.state.contacts;
    const formattedNumbers = [];
    allContacts.map(item => {
      if ('phoneNumbers' in item) {
        const cleaned = `${item.phoneNumbers[0].number}`.replace(/\D/g, '');
        if (cleaned[0] !== '1') formattedNumbers.push(`+1${cleaned}`);
        else {
          formattedNumbers.push(`+${cleaned}`);
        }
      }
    });
    return formattedNumbers;
  };

  getFriendsWithApp = formattedNumbers => {
    const awsContacts = this.state.awsContacts;
    let friendWithApp = {};
    const friends = [];

    awsContacts.map(item => {
      // const found = arr1.some(r => arr2.includes(r));
      if (formattedNumbers.includes(item.phone_number)) {
        friendWithApp = {
          given_name: item.given_name,
          last_name: item.last_name,
          phone_number: item.phone_number,
        };
        friends.push(friendWithApp);
      }
    });
    return friends;
  };

  render() {
    const formatNumber = this.formatPhoneNumber();

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Text>Edit</Text>
            </Button>
          </Left>
          <Body>
            <Title>Contacts</Title>
          </Body>
        </Header>

        <View style={styles.container}>
          <ScrollView>
            <ContactList allContacts={this.getFriendsWithApp(formatNumber)} />
          </ScrollView>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
