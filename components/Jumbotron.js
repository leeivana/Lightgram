import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    width: '55%',
    marginTop: 16,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const Jumbotron = props => (
  <View style={styles.viewStyle}>
    <Text style={styles.mainTextStyle}>{props.mainText}</Text>
    <Text style={styles.subtextStyle}>{props.subtext}</Text>
  </View>
);

export default Jumbotron;
