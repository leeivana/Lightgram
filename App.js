import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { View, Text, StyleSheet } from 'react-native';

import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react-native';

import SignUpScreen from './screens/SignUpScreen';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default withAuthenticator(App, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUpScreen />,
  <ConfirmSignUp />,
  <ForgotPassword />,
  <RequireNewPassword />,
]);
