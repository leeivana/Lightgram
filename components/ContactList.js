import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { List, Text } from 'native-base';

const ContactList = props => {
  const list = ({ allContacts }) => {
    if (allContacts) {
      return allContacts.map(item => (
        <TouchableOpacity key={item.id}>
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#f7f7f7',
            }}
          >
            <Image
              // source={require('../assets/images/robot-dev.png')}
              source={item.image}
              style={styles.imageStyle}
              resizeMode="contain"
            />
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
                >{`${item.firstName || ''} ${item.lastName || ''}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 15, marginRight: 5 }} note>
                  {'phoneNumbers' in item
                    ? item.phoneNumbers[0].number
                    : item.phoneNumbers}
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

export default ContactList;
