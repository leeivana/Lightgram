import React from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import Jumbotron from '../components/Jumbotron';

const initialState = {
  username: '+1',
  authenticationCode: '',
  showConfirmationForm: false,
  cca2: 'US',
};

const offset = 24;
const styles = StyleSheet.create({
  topContainer: {
    marginTop: 150,
    marginBottom: 0,
  },
  middleContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  phoneInput: {
    height: offset * 2.5,
    margin: offset,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.3,
    fontSize: 30,
    textAlign: 'justify',
  },
});

export default class SignUp extends React.Component {
  // need to call rendernavigation
  static navigationOptions = () => ({
    title: null,
    headerRight: (
      <Button
        title="Next"
        onPress={navigation => {
          navigation.navigate('DrawerOpen');
        }}
      />
    ),
    headerLeft: (
      <Button
        title="Back"
        onPress={navigation => {
          navigation.navigate('DrawerOpen');
        }}
      />
    ),
  });

  state = initialState;

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag = () => {
    this.countryPicker.openModal();
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { username } = this.state;
    console.log(username);
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
      console.log('successfully signed up!');
      alert('User signed up successfully!');
      this.setState({ ...initialState });
    } catch (err) {
      console.log('error confirming signing up: ', err);
    }
  };

  selectCountry = country => {
    const { cca2 } = country;
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2 });
  };

  render() {
    const { topContainer, middleContainer, phoneInput } = styles;
    const { showConfirmationForm, username, cca2 } = this.state;
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
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                style={phoneInput}
                textStyle={{ fontSize: 30 }}
                flagStyle={{ height: 25, width: 45 }}
                value={username}
                placeholder="Your Phone Number"
                onChangePhoneNumber={val => {
                  this.onChangeText('username', val);
                }}
                keyboardType="phone-pad"
                onPressFlag={this.onPressFlag}
              />
              <CountryPicker
                ref={ref => {
                  this.countryPicker = ref;
                }}
                onChange={val => this.selectCountry(val)}
                translation="eng"
                cca2={cca2}
              >
                <View />
              </CountryPicker>
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
