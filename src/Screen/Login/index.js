import React, { Component } from 'react';
import { Alert, Text, View, Image, ListView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { autobind } from 'core-decorators';
import { userStore } from '../../Services/store';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  state = {
    username: '',
    password: '',
  };

  @autobind async login() {
    const { username, password } = this.state;
    if (username && password) {
      const current = await userStore.login({ username, password });
      if (current) {
        this.props.navigation.navigate('MainScreen');
      } else {
        Alert.alert(
          '错误提示',
          '您输入的用户名或密码错误',
          [
            { text: '确定', onPress: () => console.log('OK Pressed!') },
          ],
        );
      }
    } else {
      Alert.alert(
        '错误提示',
        '您必须输入用户名和密码',
        [
          { text: '确定', onPress: () => console.log('OK Pressed!') },
        ],
      );
    }
  }

  render() {
    return (
      <Container>
        <Image
          style={styles.coverImg}
          source={ require('../../assets/background.jpg') }
          // resizeMode="cover"
          >
          <LoginForm>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              // keyboardType="default"
              placeholder="用户名"
              onChangeText={(username) => this.setState({ username })}
              style={styles.input}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              // keyboardType="default"
              placeholder="密码"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={this.login}
              style={styles.loginbtn}
              >
              <LoginButton>登陆</LoginButton>
            </TouchableOpacity>
          </LoginForm>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            >
            <Text
              style={{ backgroundColor: 'transparent', color: '#d1d1d1' }}
              >还没有账号？注册一个</Text>
          </TouchableOpacity>
        </Image>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  coverImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    height: 40,
    width: '70%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  loginbtn: {
    height: 40,
    width: '70%',
    borderColor: '#3e90f0',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#3e90f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Container = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.View`
  height: 200;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10 20;
  justify-content: space-around;
  align-items: center;
  margin-top: -60;
`;

const LoginButton = styled.Text`
  font-size: 18;
  color: #fff;
`;
