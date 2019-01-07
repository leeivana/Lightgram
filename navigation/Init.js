import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { inject } from 'mobx-react';

import { colors } from '../constants/Styling';
import { logo } from '../assets/images';
import { basicUserQuery } from '../src/graphql/queries';

@inject('userStore')
export default class Init extends React.Component {
  animatedValue = new Animated.Value(0);

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

      setTimeout(() => {
        this.props.navigation.navigate('Main');
      }, 350);
    } catch (err) {
      console.log('err:', err);
      this.props.navigation.navigate('Auth');
    }
  }

  animate() {
    const animation = Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
    });
    animation.start(() => this.animate());
  }

  render() {
    const scale = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          source={logo}
          style={[styles.image, { transform: [{ scale }] }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
