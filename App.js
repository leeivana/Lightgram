import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import LandingScreen from './screens/LandingScreen';
import AppNavigator from './navigation/AppNavigator';

Amplify.configure(awsconfig);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
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
