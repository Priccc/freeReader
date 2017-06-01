import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

module.exports = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null, // 永不过期，因为每次启动，都会重新拉取城市列表，可能存在的问题是运行期间数据变了
  enableCache: true,
});
