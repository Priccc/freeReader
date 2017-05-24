import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator, TabNavigator } from 'react-navigation';

import BookShlef from './Screen/Books/index';
import BookReader from './Screen/Reader/index'
import UCenter from './Screen/UCenter/index';

const BookShlefTab = StackNavigator({
  BookShlef: { screen: BookShlef },
  BookReader: { screen: BookReader },
}, {
  headerMode: 'none',
  initialRouteName: 'BookShlef',
  initialRouteParams: {},
  navigationOptions: {
    tabBarLabel: '书架',
    title: '书架',
    tabBarIcon: ({ tintColor }) => <Icon name="book" size={25} color={tintColor} />,
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
    tabBarIcon: ({ tintColor }) => <Icon name="user" size={25} color={tintColor} />,
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
    // SplashScreen: { screen: SplashScreen },
    // LoginScreen: { screen: LoginScreen },
    MainScreen: { screen: TabbarNavigator },
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
      <MainNavigator/>
    );
  }
}

// TODO navigation here
module.exports = App;
