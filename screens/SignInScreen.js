import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/queryHelper';
import { createUser } from '../src/mutations';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    user: {},
    authenticationCode: '',
    showConfirmationForm: false,
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = async () => {
    const { username, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);
      console.log('user successfully signed in!', user);
      const currentUser = await Auth.currentAuthenticatedUser();
      const userExists = await getUser(currentUser.username);
      console.log('currentUser', currentUser);
      console.log('userExists', userExists);
      this.setState({ user, showConfirmationForm: true });
    } catch (err) {
      console.log('error:', err);
    }
  };

  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      // first try to sign in
      await Auth.confirmSignIn(user, authenticationCode);
      // once signed in, get current user information
      const currentUser = await Auth.currentAuthenticatedUser();
      const userExists = await getUser(currentUser.username);
      // next, check to see if user exists in the database
      if (!userExists) {
        // if user does not exists, create a new user
        const createdUser = await createUser({
          id: currentUser.username,
          username: currentUser.username,
        });
      }
      // Once confirmed redirect to Main page
      // Also need to update global state of the user
      // TO DO
      // Figure out the way to pass the state around
      //  navigate('Main page')
      console.log('user successfully signed in!', user);
    } catch (err) {
      console.log('error:', err);
    }
  };

  render() {
    const { showConfirmationForm } = this.state;

    return (
      <View style={styles.container}>
        {!showConfirmationForm && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('username', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('password', val)}
            />
            <Button title="Sign In" onPress={this.signIn} />
          </Fragment>
        )}
        {showConfirmationForm && (
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="Authentication Code"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('authenticationCode', val)}
            />
            <Button title="Confirm Sign In" onPress={this.confirmSignIn} />
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
