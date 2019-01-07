import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { inject } from 'mobx-react';
import { Button } from 'native-base';
import { logo } from '../../assets/images';
import { basicUserQuery } from '../../src/graphql/queries';
import { createUserMutation } from '../../src/graphql/mutations';
import Block from '../../components/ColorBlock';

@inject('userStore')
export default class SignIn extends React.Component {
  state = {
    user: {},
    username: '',
    password: '',
    authenticationCode: '',
    showConfirmationForm: false,
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = async () => {
    const { username, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);
      console.log('successfully signed in!');
      this.setState({ user, showConfirmationForm: true });
    } catch (err) {
      console.log('error signing in...', err);
    }
  };

  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      // first try to sign in
      await Auth.confirmSignIn(user, authenticationCode);
      // once signed in, get current user information
      const currentUser = await Auth.currentAuthenticatedUser();
      const {
        attributes: { given_name, family_name, phone_number },
        signInUserSession: {
          accessToken: {
            payload: { sub },
          },
        },
      } = currentUser;
      let authenticatedUser = await API.graphql(
        graphqlOperation(basicUserQuery, { id: sub })
      );
      // next, check to see if user exists in the database
      if (!authenticatedUser.data.getUser) {
        // if user does not exists, create a new user
        await API.graphql(
          graphqlOperation(createUserMutation, {
            id: sub,
            given_name,
            family_name,
            phone_number,
          })
        );
        authenticatedUser = await API.graphql(
          graphqlOperation(basicUserQuery, { id: sub })
        );
      }
      // Update user store
      this.props.userStore.updateUser(authenticatedUser.data.getUser);

      this.props.navigation.navigate('Main');
      console.log('user successfully confirm sign in!');
    } catch (err) {
      console.log('error confirming sign in: ', err);
    }
  };

  render() {
    const { showConfirmationForm } = this.state;

    return (
      <View style={styles.container}>
        <Block style={{ transform: [{ rotate: '-55deg' }] }} />
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        {!showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={val => this.onChangeText('username', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={val => this.onChangeText('password', val)}
            />
            <Button
              rounded
              primary
              block
              large
              style={styles.loginBtn}
              onPress={this.signIn}
            >
              <Text
                style={
                  Platform.OS === 'android'
                    ? {
                        fontSize: 16,
                        textAlign: 'center',
                        top: -5,
                        color: '#fff',
                      }
                    : { fontSize: 16, fontWeight: '900', color: '#fff' }
                }
              >
                Get Started
              </Text>
            </Button>
          </View>
        )}
        {showConfirmationForm && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Authentication Code"
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('authenticationCode', val)}
            />
            <Button
              rounded
              primary
              block
              large
              style={styles.loginBtn}
              onPress={this.confirmSignIn}
            >
              <Text
                style={
                  Platform.OS === 'android'
                    ? {
                        fontSize: 16,
                        textAlign: 'center',
                        top: -5,
                        color: '#fff',
                      }
                    : { fontSize: 16, fontWeight: '900', color: '#fff' }
                }
              >
                Confirm
              </Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
  },
  loginBtn: {
    height: 50,
  },
  input: {
    height: 50,
    fontWeight: '500',
    marginBottom: 10,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 15,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginHorizontal: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
});
