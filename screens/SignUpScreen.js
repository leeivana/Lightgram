// SignUp.js
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import { Auth, API, graphqlOperation } from 'aws-amplify';

const initialState = {
  given_name: '',
  family_name: '',
  password: '',
  username: '',
  authenticationCode: '',
  showConfirmationForm: false,
};

export default class SignUpScreen extends React.Component {
  state = initialState;

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { given_name, family_name, password, username } = this.state;
    try {
      const success = await Auth.signUp({
        username,
        password,
        given_name,
        family_name,
        attributes: { phone_number: username },
      });
      console.log('user successfully signed up!: ', success);
      this.setState({ showConfirmationForm: true });
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('successfully signed up!');
      alert('User signed up successfully!');
      this.setState({ ...initialState });
      // Once confirmed redirect to signIn page
      //  navigate('SignIn')
    } catch (err) {
      console.log('error confirming signing up: ', err);
    }
  };

  render() {
    const { showConfirmationForm } = this.state;

    return (
      <View style={styles.container}>
        {!showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Fist Name"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('given_name', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('family_name', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('username', val)}
            />
            <Button title="Sign Up" onPress={this.signUp} />
          </View>
        )}
        {showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Authentication code"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('authenticationCode', val)}
            />
            <Button title="Confirm Sign Up" onPress={this.confirmSignUp} />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
