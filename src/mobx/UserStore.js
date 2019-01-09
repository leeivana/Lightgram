import { observable, action } from 'mobx';

export default class UserStore {
  @observable user = {};

  @observable contact = {};

  @observable loadingUser = true;

  @action updateUser(user) {
    this.user = user;
  }

  @action updateUserLoading(val) {
    this.loadingUser = val;
  }

  @action updateContact(contact) {
    console.log('updated contact mobx');
    this.contact = contact;
  }
}
