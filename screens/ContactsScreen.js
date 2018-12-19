import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import { WebBrowser, Permissions, Contacts } from 'expo';
import ContactList from '../components/ContactList';

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
  };

  componentDidMount() {
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ContactList allContacts={this.state.contacts} />
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
