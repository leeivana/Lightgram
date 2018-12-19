import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import AppNavigator from './navigation/AppNavigator';

Amplify.configure(awsconfig);

export default class App extends React.Component {
  state = {
    user: null,
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/* <LandingScreen /> */}
        {user ? (
          <AppNavigator />
        ) : (
          <LoginScreen setUser={u => this.setState({ user: u })} />
        )}
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
