import React from 'react';
import Amplify from 'aws-amplify';

import Provider from './src/mobx';

import AppNavigator from './navigation/AppNavigator';
import MainAppNavigator from './navigation/MainAppNavigator';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
