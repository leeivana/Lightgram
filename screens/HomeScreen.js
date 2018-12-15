import React from 'react';
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
    const { container, topContainer, middleContainer, nameInput } = styles;

    return (
      <View style={container}>
        <View style={topContainer}>
          <Jumbotron mainText='Your Phone'
            subtext='Please confirm your country code and enter your phone number'
          />
        </View>
        <View style={middleContainer}>
         <TextInput
          style={nameInput}
          placeHolder="Your Phone Number"
          // value={this.state.name}
        />
        </View>
      </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
  flex: 2,
  justifyContent: 'center',
  alignSelf: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  nameInput: {
    height: offset * 2,
    // width: '100%',
    margin: offset,
    paddingHorizontal: offset,
    borderWidth: 1,
  },
});
