import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { Button } from 'native-base';

import { Auth } from 'aws-amplify';
import Block from '../../components/ColorBlock';

export default class SignUpScreen extends React.Component {
  state = {
    given_name: '',
    family_name: '',
    password: '',
    username: '',
    authenticationCode: '',
    showConfirmationForm: false,
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { given_name, family_name, password, username } = this.state;
    try {
      const success = await Auth.signUp({
        username,
        password,
        attributes: { phone_number: username, given_name, family_name },
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
        <Block style={{ transform: [{ rotate: '-55deg' }] }} />
        {!showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Fist Name"
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('given_name', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('family_name', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('username', val)}
            />
            <Button
              rounded
              primary
              block
              large
              style={styles.loginBtn}
              onPress={this.signUp}
            >
              <Text
                style={
                  Platform.OS === 'android'
                    ? {
                        fontSize: 16,
                        textAlign: 'center',
                        top: -5,
                        color: '#fff',
                      }
                    : { fontSize: 16, fontWeight: '900', color: '#fff' }
                }
              >
                Sign Up
              </Text>
            </Button>
          </View>
        )}
        {showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Authentication code"
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('authenticationCode', val)}
            />
            <Button
              rounded
              primary
              block
              large
              style={styles.loginBtn}
              onPress={this.confirmSignUp}
            >
              <Text
                style={
                  Platform.OS === 'android'
                    ? {
                        fontSize: 16,
                        textAlign: 'center',
                        top: -5,
                        color: '#fff',
                      }
                    : { fontSize: 16, fontWeight: '900', color: '#fff' }
                }
              >
                Confirm
              </Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginBtn: {
    height: 50,
  },
  input: {
    height: 50,
    fontWeight: '500',
    marginBottom: 10,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 15,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginHorizontal: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
});
