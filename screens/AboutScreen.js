import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'first',
    title: 'Welcome To Lightgram',
    text: "Lighthouse's very own chat application",
    image: require('../assets/images/landing-first.png'),
    imageStyle: styles.image,
    backgroundColor: '#84dbff',
  },
  {
    key: 'second',
    title: 'Encrypted Chats',
    text: 'Chats are private and encrypted  ',
    image: require('../assets/images/landing-second.png'),
    imageStyle: styles.image,
    backgroundColor: '#324a5e',
  },
  {
    key: 'third',
    title: 'Serverless Application',
    text: 'Lightgram is serverless and is hosted on AWS',
    image: require('../assets/images/landing-third.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
];

export default class AboutScreen extends React.Component {
  state = {
    goToMainApp: false,
  };

  _onDone = () => {
    this.setState({ goToMainApp: true });
  };

  _renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-arrow-round-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );

  _renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-checkmark"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );

  render() {
    if (this.state.goToMainApp) {
      this.props.navigation.navigate('Main');
    }
    return (
      <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        showSkipButton
        onDone={this._onDone}
        onSkip={this._onDone}
      />
    );
  }
}
