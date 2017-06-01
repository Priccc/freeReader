import Config from 'react-native-config';

const isProduction = Config.ENV === 'production';
const emptyFn = () => {};

module.exports = {
  debug: isProduction ? emptyFn : console.log,
  info: isProduction ? emptyFn : console.log,
  error: isProduction ? emptyFn : console.error,
  warn: isProduction ? emptyFn : console.warn,
};
