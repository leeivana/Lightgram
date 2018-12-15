import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    return (
      <View style={styles.container}>
        <Jumbotron mainText={'Your Phone'} />
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
