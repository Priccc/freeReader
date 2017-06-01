import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import logger from './logger';

const { API_BASE_URL } = Config;

axios.defaults.timeout = 5000;
axios.defaults.baseURL = API_BASE_URL;

// common headers
axios.defaults.headers.common['X-UserAgent'] = DeviceInfo.getUserAgent();
axios.defaults.headers.common['X-AppVersion'] = DeviceInfo.getVersion();
axios.defaults.headers.common['X-DeviceId'] = DeviceInfo.getUniqueID();
axios.defaults.headers.common['X-DeviceInfo'] = `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`;
axios.defaults.headers.common['X-System'] = `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
axios.defaults.headers.common['X-Environment'] = `${DeviceInfo.getDeviceCountry()} ${DeviceInfo.getDeviceLocale()} ${DeviceInfo.getTimezone()}`;  // eslint-disable-line

// post headers
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截，增加 UserID
// axios.interceptors.request.use(
//   (config) => {
//     const store = require('./store/UserStore'); // eslint-disable-line
//     config.headers.common['X-UserId'] = store.current ? store.current._id : ''; // eslint-disable-line
//     // logger.debug('api.request', config);
//     return config;
//   },
//   (err) => {
//     logger.warn('api.request.error', err);
//     return Promise.reject(err);
//   }
// );

// // 响应拦截，后续可能在这里容错、统计性能
// axios.interceptors.response.use(
//   (res) => {
//     logger.debug('api.response', { request: res.config, data: res.data });
//     return res;
//   },
//   (err) => {
//     logger.warn('api.response.error', err);
//     return Promise.reject(err);
//   }
// );

module.exports = axios;
