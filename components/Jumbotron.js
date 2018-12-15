import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Jumbotron = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.mainTextStyle}>{props.mainText}</Text>
      <Text style={styles.subtextStyle}>{props.subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTextStyle: {
    fontWeight: '300',
    fontSize: 40,
  },
  viewStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  subtextStyle: {
    borderWidth: 1,
    width: '60%',
    marginTop: 16,
    fontSize: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
  },
});

export default Jumbotron;
