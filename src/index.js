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
import BookReader from './Screen/Reader'
import BookSearch from './Screen/Search'
import BookDetail from './Screen/Books/BookDetail'
import Directory from './Screen/Reader/Directory'
import UCenter from './Screen/UCenter';

console.disableYellowBox = true;

// tabbar icons
const icons = {
  books: require('./assets/books.png'),
  search: require('./assets/public_search.png'),
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

const BookSearchTab = StackNavigator({
  BookSearch: { screen: BookSearch },
}, {
  headerMode: 'none',
  initialRouteName: 'BookSearch',
  initialRouteParams: {},
  navigationOptions: {
    tabBarLabel: '搜索',
    title: '搜索',
    tabBarIcon: ({ tintColor }) => <Image source={icons.search} style={[{ width: 18, height: 18 }, { tintColor }]} />,
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
  BookSearchTab: { screen: BookSearchTab },
  UCenterTab: { screen: UCenterTab },
}, {
  headerMode: 'none',
  initialRouteName: 'BookShlefTab',
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
    BookDetail: { screen: BookDetail },
    Directory: { screen: Directory },
  },
  // {
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerVisible: false,
  //   },
  // },
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
