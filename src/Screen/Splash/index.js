import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import { userStore } from '../../Services/store';

@observer
export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    // 需要在 SplashScreen 触发所有的数据加载进程

    if (await userStore.isLoggedIn()) {
      this.goto('MainScreen');
    } else {
      this.goto('LoginScreen');
    }
  }

  goto(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    return (
      <Container>
        <Text
          style={{ fontSize: 25 }}
          >Wellcome to Reader</Text>
      </Container>
    );
  }
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
