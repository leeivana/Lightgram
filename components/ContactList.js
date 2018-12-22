import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { List, Text } from 'native-base';
import { Icon } from 'expo';
import { withNavigation } from 'react-navigation';

const ContactList = props => {
  const list = ({ allContacts }) => {
    if (allContacts) {
      return allContacts.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            props.navigation.navigate('Chat');
          }}
        >
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#f7f7f7',
            }}
          >
            <View>
              {/*               
              {item.imageAvailable ? (
                <Image
                  style={styles.imageStyle}
                  resizeMode="contain"
                  source={item.image}
                />
              ) : (
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                  size={75}
                />
              )} */}
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={75}
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 280,
                }}
              >
                <Text
                  style={{ marginLeft: 15, fontWeight: '600' }}
                >{`${item.given_name || ''} ${item.last_name || ''}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 15, marginRight: 5 }} note>
                  {item.phone_number}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ));
    }
  };
  return <List>{list(props)}</List>;
};

const styles = {
  imageStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
};

export default withNavigation(ContactList);
