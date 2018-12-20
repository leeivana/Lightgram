import React, { Fragment } from 'react';
import {
  Platform,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Button,
  TextInput,
} from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
import {
  Authenticator,
  SignIn,
  SignUp,
  ConfirmSignUp,
  Greetings,
} from 'aws-amplify-react-native';

import awsconfig from './aws-exports';
// import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
// import AppNavigator from './navigation/AppNavigator';

Amplify.configure(awsconfig);

const initialState = {
  firstname: '',
  lastname: '',
  password: '',
  phone_number: '',
  authenticationCode: '',
  showConfirmationForm: false,
};

class MySignUp extends SignUp {
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
      </View>
    );
  }
}

export default class App extends React.Component {
  state = {
    user: null,
  };

  // async componentDidMount() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     console.log('user: ', user);
  //     if (user) {
  //       return <AppNavigator />;
  //     }
  //     return <LoginScreen setUser={u => this.setState({ user: u })} />;
  //   } catch (err) {
  //     console.log('error: ', err);
  //     return <LoginScreen setUser={u => this.setState({ user: u })} />;
  //   }
  // }

  render() {
    return (
      <Authenticator hideDefault>
        <SignIn />
        <MySignUp />
        <ConfirmSignUp />
        <Greetings />
      </Authenticator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
  },
});
