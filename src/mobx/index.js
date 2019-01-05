import React from 'react';
import { Provider } from 'mobx-react';

import UserStore from './UserStore';

const userStore = new UserStore();

const stores = {
  userStore,
};

export default class MobXProvider extends React.Component {
  render() {
    return <Provider {...stores}>{this.props.children}</Provider>;
  }
}
