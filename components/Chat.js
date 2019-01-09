import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject } from 'mobx-react';

@inject('userStore')
class Chats extends Component {

  render(){
  const { conversationName, time, content, src, navigation, members, onPress } = this.props; 
  const {
    container,
    imageStyle,
    headerContentStyle,
    headerTextStyle,
    timeStyle,
    msgContent,
    msgWrapper,
  } = styles;
  return (
    <TouchableOpacity
        onPress={onPress}
    >
      <View style={container}>
        <Image
          source={{
            uri: `https://api.adorable.io/avatars/100/${conversationName}.png`,
          }}
          style={imageStyle}
          resizeMode="contain"
        />
        <View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{conversationName}</Text>
            <Text style={timeStyle}>{time}</Text>
          </View>
          <View style={msgWrapper}>
            <Text numberOfLines={1} style={msgContent}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
  },
  imageStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  headerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  headerTextStyle: {
    marginLeft: 15,
    fontWeight: '600',
  },
  timeStyle: {
    color: '#333',
    fontSize: 10,
  },
  msgContent: {
    fontWeight: '400',
    color: '#333',
    marginLeft: 15,
  },
  msgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },
});

export default withNavigation(Chats);
