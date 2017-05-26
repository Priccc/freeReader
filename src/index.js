import React, { Component } from 'react';
import { Text, Image } from 'react-native'; // eslint-disable-line
import { StackNavigator, TabNavigator } from 'react-navigation';
import Config from 'react-native-config';
import logger from './Services/logger';
import api from './Services/api';
import tracker, { trackPageView } from './Services/tracker';

global.api = api;
global.logger = logger;
global.tracker = tracker;

/* eslint-disable */
import SplashScreen from './Screen/Splash';
import LoginScreen from './Screen/Login';
import BookShlef from './Screen/Books/index';
import BookReader from './Screen/Reader/index'
import UCenter from './Screen/UCenter/index';

console.disableYellowBox = false;

// tabbar icons
const icons = {
  books: require('./assets/books.png'),
  ucenter: require('./assets/user-center.png'),
};

const BookShlefTab = StackNavigator({
  BookShlef: { screen: BookShlef },
}, {
  headerMode: 'none',
  initialRouteName: 'BookShlef',
  initialRouteParams: {},
  navigationOptions: {
    tabBarLabel: '书架',
    title: '书架',
    tabBarIcon: ({ tintColor }) => <Image source={icons.books} style={[{ width: 18, height: 18 }, { tintColor }]} />,
  },
});

const UCenterTab = StackNavigator({
  UCenter: { screen: UCenter },
}, {
  headerMode: 'none',
  initialRouteName: 'UCenter',
  initialRouteParams: {},
  navigationOptions: {
    tabBarLabel: '个人中心',
    title: '个人中心',
    tabBarIcon: ({ tintColor }) => <Image source={icons.ucenter} style={[{ width: 18, height: 18 }, { tintColor }]} />,
  },
});

const TabbarNavigator = TabNavigator({
  BookShlefTab: { screen: BookShlefTab },
  UCenterTab: { screen: UCenterTab },
}, {
  headerMode: 'none',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});

const MainNavigator = StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LoginScreen: { screen: LoginScreen },
    MainScreen: { screen: TabbarNavigator },
    BookReader: { screen: BookReader },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

class App extends Component {
  render() {
    return (
      <MainNavigator onNavigationStateChange={trackPageView} />
    );
  }
}

// TODO navigation here
module.exports = App;
