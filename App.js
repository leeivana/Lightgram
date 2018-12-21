import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { View, Text, StyleSheet } from 'react-native';

import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn,
  SignUp,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react-native';

import SignUpScreen from './screens/SignUpScreen';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default class App extends React.Component {
  render() {
    return <SignUpScreen />;
  }
}
