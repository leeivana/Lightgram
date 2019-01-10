import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { List, Text } from 'native-base';
import { Icon } from 'expo';
import { withNavigation } from 'react-navigation';
import { inject } from 'mobx-react';

@inject('userStore')
class ContactList extends Component {
  renderItem = async arg => {
    try {
      await this.props.userStore.updateContact(arg);
      this.props.navigation.navigate('Chat');
    } catch (e) {
      console.error(e);
    }
  };

  // ChangeThisTitle = titleText => {
  //   const { state } = navigation;
  //   const { setParams } = this.props.navigation;
  //   setParams({ title: titleText });
  // };

  render() {
    const { allContacts } = this.props;
    const list = () => {
      if (allContacts) {
        return allContacts.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.renderItem(item);
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
    return (
      <View>
        <List>{list(this.props)}</List>
      </View>
    );
  }
}

export default withNavigation(ContactList);
