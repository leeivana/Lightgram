import React from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import Jumbotron from '../components/Jumbotron';
import PhoneInput from '../components/PhoneInput';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  _handlePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  render() {
    const { container, topContainer, middleContainer } = styles;

    return (
      <KeyboardAvoidingView style={container} behavior="height" enabled>
        <View style={topContainer}>
          <Jumbotron mainText='Your Phone'
            subtext='Please confirm your country code and enter your phone number'
          />
        </View>
        <View style={middleContainer}>
         <PhoneInput/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    paddingTop: 200,
    paddingBottom: 0,
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
});
