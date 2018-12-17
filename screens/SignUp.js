import React, { Fragment } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import Jumbotron from '../components/Jumbotron';

const initialState = {
  username: '+1',
  authenticationCode: '',
  showConfirmationForm: false,
};

export default class SignUp extends React.Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: 'SignUp',
  //   headerStyle: { borderBottomWidth: 0, color: black },
  //   headerRight: (
  //     <Button
  //       title="Next"
  //       onPress={navigation => {
  //         navigation.navigate('DrawerOpen');
  //       }}
  //     />
  //   ),
  //   headerLeft: (
  //     <Button
  //       title="Back"
  //       onPress={navigation => {
  //         navigation.navigate('DrawerOpen');
  //       }}
  //     />
  //   ),
  // });
  // static navigationOptions = {
  //   title: 'Home',
  // };

  state = initialState;

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
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
    const { topContainer, middleContainer, phoneInput } = styles;
    const { showConfirmationForm } = this.state;
    return (
      <View>
        {!showConfirmationForm && (
          <View>
            <View style={topContainer}>
              <Jumbotron
              mainText="Your Phone"
              subtext="Please confirm your country code and enter your phone number"
              />
            </View>
            <View style={middleContainer}>
              <TextInput
                value={this.state.username}
                keyboardType="phone-pad"
                style={phoneInput}
                placeholder="Your Phone Number"
                onChangeText={val => this.onChangeText('username', val)}
              />
              <Button title="Sign Up" onPress={this.signUp} />
            </View>
          </View>
        )}
        {showConfirmationForm && (
          <View>
            <View style={topContainer}>
              <Jumbotron
                mainText="Authentication"
                subtext="Please enter your Authorization Code"
              />
            </View>
            <View style={middleContainer}>
              <TextInput
                style={phoneInput}
                keyboardType="phone-pad"
                placeholder="Authentication Code"
                onChangeText={val =>
                  this.onChangeText('authenticationCode', val)
                }
              />
              <Button title="Confirm Sign Up" onPress={this.confirmSignUp} />
            </View>
          </View>
        )}
      </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  topContainer: {
    marginTop: 150,
    marginBottom: 0,
  },
  middleContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  phoneInput: {
    height: offset * 2.5,
    margin: offset,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.3,
    fontSize: 23,
    textAlign: 'justify',
  },
});
