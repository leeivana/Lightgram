import React, { Fragment } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

import { Auth } from 'aws-amplify';

const initialState = {
  username: '',
  user: {},
  authenticationCode: '',
  showConfirmationForm: false,
};

export default class SignUp extends React.Component {
  state = initialState;

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signIn = async () => {
    const { username } = this.state;
    try {
      const user = await Auth.signIn({
        username,
        password: username,
      });
      console.log('user successfully signed in!', user);
      this.setState({ user, showConfirmationForm: true });
    } catch (err) {
      console.log('error:', err);
    }
  };

  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      await Auth.confirmSignIn(user, authenticationCode);
      console.log('successfully sign in!');
      alert('User signed in successfully!');
    } catch (err) {
      console.log('error:', err);
    }
  };

  signUp = async () => {
    const { username } = this.state;
    try {
      const success = await Auth.signUp({
        username,
        password: username,
        attributes: { phone_number: username },
      });
      console.log('user successfully signed up!: ', success);
      this.setState({ showConfirmationForm: true });
    } catch (err) {
      if (err.code === 'UsernameExistsException') {
        this.signIn();
      }
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
      if (err.code === 'NotAuthorizedException') {
        this.confirmSignIn();
      }
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
              placeholder="Phone Number"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('username', val)}
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
    marginTop: 300,
    flex: 1,
    justifyContent: 'center',
  },
});
