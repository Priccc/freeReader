import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    const { current } = userStore;
    return (
      <Container>
        <PersonalInfo>
          <Image
            source={require('../../assets/avator.png')}
            style={styles.avator}
          />
          <Info>
            <Text>{current.name}</Text>
          </Info>
        </PersonalInfo>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.6}
          // onPress={}
          >
          <Text style={{ margin: 10, fontSize: 16, padding: 10 }}>修改密码</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.6}
          onPress={this.logout}>
          <Text style={{ fontSize: 16, color: '#fff' }}>注销登录</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avator: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  logout: {
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ff4f4e',
  },
});

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const PersonalInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20;
  borderBottomWidth: 1;
  borderBottomColor: #c4cce6;
`;
const Info = styled.View`
  margin-left: 20;
  justify-content: center;
  align-items: flex-start;
`;
