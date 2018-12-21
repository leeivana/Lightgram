// SignUp.js
import React, { Fragment } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { SignUp } from 'aws-amplify-react-native';

import { Auth } from 'aws-amplify';

const initialState = {
  given_name: '',
  family_name: '',
  password: '',
  phone_number: '',
  authenticationCode: '',
  showConfirmationForm: false,
};

export default class SignUpScreen extends SignUp {
  state = initialState;

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { given_name, family_name, password, phone_number } = this.state;
    try {
      const success = await Auth.signUp({
        username: phone_number,
        password,
        attributes: {
          given_name,
          family_name,
          phone_number,
        },
      });
      console.log('user successfully signed upsss!: ', success);
      this.setState({ showConfirmationForm: true });
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('successully signed up!');
      alert('User signed up successfully!');
      this.setState({ ...initialState });
    } catch (err) {
      console.log('error confirming signing up: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.showConfirmationForm && (
          <Fragment>
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
              onChangeText={val => this.onChangeText('phone_number', val)}
            />
            <Button title="Sign Up" onPress={this.signUp} />
          </Fragment>
        )}
        {this.state.showConfirmationForm && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Authentication code"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('authenticationCode', val)}
            />
            <Button title="Confirm Sign Up" onPress={this.confirmSignUp} />
          </Fragment>
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
