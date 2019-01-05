import { observable, action } from 'mobx';

export default class UserStore {
  @observable user = {};

  @observable loadingUser = true;

  @action updateUser(user) {
    this.user = user;
  }

  @action updateUserLoading(val) {
    this.loadingUser = val;
  }
}
