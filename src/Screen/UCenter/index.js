import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { autobind } from 'core-decorators';
import { userStore } from '../../Services/store';

export default class user extends Component {

  static navigationOptions = {
    title: '个人中心',
    headerTitle: '个人中心',
    // header: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333',
    },
    gesturesEnabled: false,
  };

  @autobind logout() {
    userStore.logout();
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <Container>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.6}
          onPress={this.logout}>
          <Text style={{ margin: 10, fontSize: 20, padding: 10 }}>注销登录</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
