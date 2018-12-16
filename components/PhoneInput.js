import React, { Component }from 'react';
import { TextInput, View, StyleSheet, Animated, PanResponder } from 'react-native';

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
    const panResponder = PanResponder.create({
      // onStartShouldSetPanResponder
    });
    this.state = {
      phoneNumber: '',
    };
  }

  render() {
    return (
      <View>
        <TextInput
          keyboardType="phone-pad"
          style={styles.phoneInput}
          placeholder="Your Phone Number"
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          value={this.state.phoneNumber}
        />
      </View>
    );
  }
}

export default PhoneInput;
