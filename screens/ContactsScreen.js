import React from 'react';
import { Button, ScrollView, StyleSheet, View, Linking } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { WebBrowser, Permissions, Contacts } from 'expo';
import ContactList from '../components/ContactList';

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

    awsContacts.map((item, index) => {
      // const found = arr1.some(r => arr2.includes(r));
      if (
        formattedNumbers.includes(item.phone_number) &&
        !formattedNumbers.some(r => friends.includes(r))
      ) {
        friendWithApp = {
          given_name: item.given_name,
          last_name: item.last_name,
          phone_number: item.phone_number,
        };
        friends.push(friendWithApp);
      }
    });

    console.log(friends);
    return friends;
  };

  render() {
    const formatNumber = this.formatPhoneNumber();
    // console.log(this.getFriendsWithApp(formatNumber));
    // console.log(this.state.contacts);
    return (
      <View style={styles.container}>
        <ScrollView>
          <ContactList allContacts={this.getFriendsWithApp(formatNumber)} />
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
});
