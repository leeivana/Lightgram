import React from 'react';
import { Auth } from 'aws-amplify';

import { inject } from 'mobx-react';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';

@inject('userStore')
export default class SettingsScreen extends React.Component {
  onSignOut = async () => {
    await Auth.signOut();
    this.props.userStore.updateUser(null);
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button full onPress={this.onSignOut}>
            <Text>Sign Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
