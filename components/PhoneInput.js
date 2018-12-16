import React, { Component }from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Keyboard,
} from 'react-native';

const offset = 24;
const styles = StyleSheet.create({
  phoneInput: {
    height: offset * 2.5,
    margin: offset,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.3,
    fontSize: 23,
    textAlign: 'justify',
  },
});

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }

  render() {
    //test phone number before submission
    const isValid = phoneNum => {
      console.log(
        /(^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$)/.test(phoneNum)
      );
    };

    return (
      <View>
        <TextInput
          keyboardType="phone-pad"
          style={styles.phoneInput}
          placeholder="Your Phone Number"
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          value={this.state.phoneNumber}
          maxLength={13}
        />
      </View>
    );
  }
}

export default PhoneInput;
