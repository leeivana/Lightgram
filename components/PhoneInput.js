import React, { Component }from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const PhoneInput = () => {
  const offset = 24;
  const styles = StyleSheet.create({
    phoneInput: {
      height: offset * 2.5,
      width: '100%',
      margin: offset,
      paddingHorizontal: offset,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.3,
    },
  });
  return (
    <View>
      <TextInput
          keyboardType={'phone-pad'}
          style={styles.phoneInput}
          placeholder="Your Phone Number"
          // value={this.state.name}
        />
    </View>
  );
};


export default PhoneInput;
