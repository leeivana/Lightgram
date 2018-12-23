import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const Chats = ({ conversationName, time, content, src, navigation }) => {
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
      onPress={() => {
        navigation.navigate('Chat');
      }}
    >
      <View style={container}>
        <Image source={{ src }} style={imageStyle} resizeMode="contain" />
        <View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{conversationName}</Text>
            <Text style={timeStyle}>{time}</Text>
          </View>
          <View style={msgWrapper}>
            {/* <Icon
              name="done-all"
              size={15}
              color="#7dd5df"
              style={{ marginLeft: 15, marginRight: 5 }}
            /> */}
            <Text numberOfLines={1} style={msgContent}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
