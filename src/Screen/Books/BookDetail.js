import React, { Component } from 'react';
import { Alert, Text, View, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { autobind } from 'core-decorators';
import { userStore } from '../../Services/store';

import Book from '../Components/Book';

export default class BookDetail extends Component {

  static navigationOptions = {
    title: '书籍详情',
    headerTitle: '书籍详情',
    // header: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333',
    },
    // gesturesEnabled: false,
  };

  state = {
    isJoining: false,
    book: null,
  };

  @autobind async joinShelf() {
    this.setState({
      isJoining: true,
    });
    const { book } = this.props.navigation.state.params;
    const { _id } = userStore.current;
    const json = {
      name: book.name,
      author: book.author,
      type: book.type,
      introduction: book.introduction,
      image_url: book.image_url,
      url: book.url,
    };
    await api.post(`/novel/joinbookshelf?uid=${_id}`, json)
      .then(({ data }) => {
        this.setState({
          isJoining: false,
        });
        if (data.status === 200) {
          this.props.navigation.navigate('MainScreen');
        } else {
          Alert.alert(
            '错误提示',
            '获取书籍信息失败，请再次点击加入书架',
            [
              { text: '确定', onPress: () => console.log('OK Pressed!') },
            ],
          );
          logger.error(new Error('join bookshelf faile!!'));
        }
      }).catch(e => new Error(`join bookshelf faile!!:${e}`));
  }

  render() {
    const { book } = this.props.navigation.state.params;
    const { isJoining } = this.state;
    return (
      <Container>
        <Book name={book.name} author={book.author} coverImg={book.image_url} type={book.type} />
        <JoinBookShelf
          onPress={this.joinShelf}
          activeOpacity={0.6}
          >
          <Text
            style={{ textAlign: 'center', lineHeight: 35, color: '#fff' }}
            >加入书架</Text>
        </JoinBookShelf>
        <Introduction>
          {book.introduction}
        </Introduction>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isJoining}
          style={{ height: '40%', width: '70%' }}
          >
          <ModalAlert>
            <ActivityIndicator animating={true} size="large" color="#fff" />
            <Text style={{ color: '#fff' }}>正在获取书籍信息，请稍后...</Text>
          </ModalAlert>
        </Modal>
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const JoinBookShelf = styled.TouchableOpacity`
  width: 150;
  height: 40;
  border-width: 1;
  border-color: transparent;
  border-radius: 5;
  background-color: #e69b1c;
  margin: 20 0;
  overflow: hidden;
`;

const Introduction = styled.Text`
  line-height: 20;
  font-size: 16;
  padding: 0 10;
`;

const ModalAlert = styled.View`
  height: 100;
  width: 200;
  background-color: #878787;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -100;
  justify-content: center;
  align-items: center;
  border-width: 1;
  border-color: #878787;
  border-radius: 10;
`;
