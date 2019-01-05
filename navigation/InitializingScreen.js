import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { inject } from 'mobx-react';
import { basicUserQuery } from '../src/graphql/queries';

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
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/images/landing-first.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/images/landing-second.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../assets/images/landing-third.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
];

@inject('userStore')
export default class InitializingScreen extends React.Component {
  state = {
    goToLogin: false,
  };

  async componentDidMount() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const {
        signInUserSession: {
          accessToken: {
            payload: { sub },
          },
        },
      } = currentUser;
      const authenticatedUser = await API.graphql(
        graphqlOperation(basicUserQuery, { id: sub })
      );
      this.props.userStore.updateUser(authenticatedUser.data.getUser);

      this.props.navigation.navigate('Main');
    } catch (err) {
      console.log('err:', err);
    }
  }

  _onDone = () => {
    this.setState({ goToLogin: true });
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
    if (this.state.goToLogin) {
      this.props.navigation.navigate('Auth');
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
