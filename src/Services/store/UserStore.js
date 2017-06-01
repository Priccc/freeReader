import qs from 'qs';
import Config from 'react-native-config';
import { observable, action, autorun } from 'mobx';
import storage from '../storage';
import logger from '../logger';
import api from '../api';

const Keys = {
  CURRENT: 'user.info',
};

class UserStore {
  @observable current = null;

  constructor() {
    storage
      .load({ key: Keys.CURRENT })
      .then(current => {
        this.current = current;
      })
      .catch(err => {
        logger.warn('UserStore.read.current.error', err);
      });
  }

  @action logout() {
    if (this.current) {
      this.current.isLoggedIn = false;
    }
  }

  @action async login(userInfo) {
    console.log(userInfo);
    console.log(api.defaults.baseURL);
    const res = await api.post('/login', userInfo);
    if (res.data.data) {
      logger.info('UserStore.login.success', res.data.data);
      this.current = Object.assign({ isLoggedIn: true }, res.data.data);
    } else {
      logger.warn('UserStore.login.error', res.data.errmsg);
    }

    return this.current;
  }

  isLoggedIn() {
    return new Promise(resolve => {
      storage
        .load({ key: Keys.CURRENT })
        .then(current => {
          resolve(current.isLoggedIn);
        })
        .catch(err => {
          logger.warn('UserStore.read.isLoggedIn.error', err);
          resolve(false);
        });
    });
  }
  /*
   *
   */
}

const store = new UserStore();

// auto matical persistant
const disposer = autorun(() => {
  if (store.current) {
    if (store.current.isLoggedIn) {
      storage.save({ key: Keys.CURRENT, data: store.current });
    } else {
      storage.remove({ key: Keys.CURRENT });
    }
  }
});

disposer.onError((err) => {
  logger.warn('UserStore.persist.error', err);
});

module.exports = store;
