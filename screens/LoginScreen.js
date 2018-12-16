import React from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { WebBrowser } from 'expo';
import Jumbotron from '../components/Jumbotron';
import PhoneInput from '../components/PhoneInput';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: null,
    headerRight: <Button title="Next" onPress={(navigation)=>{ navigation.navigate('DrawerOpen'); }} />,
    headerLeft: <Button title="Back" onPress={(navigation)=>{ navigation.navigate('DrawerOpen'); }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }

  _handlePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  render() {
    const { container, topContainer, middleContainer } = styles;

    return (
      <ScrollView
        style={container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={topContainer}>
          <Jumbotron
            mainText='Your Phone'
            subtext='Please confirm your country code and enter your phone number'
          />
        </View>
        <View style={middleContainer}>
          <PhoneInput />
        </View>
      </ScrollView>
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
