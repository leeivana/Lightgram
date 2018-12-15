import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Jumbotron = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.mainText}</Text>
      <Text>Subtext</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  viewStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 250,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
});

export default Jumbotron;
