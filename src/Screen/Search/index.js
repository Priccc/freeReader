import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { autobind } from 'core-decorators';

import Book from '../Components/Book';

export default class BookSearch extends Component {
  _dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

  static navigationOptions = {
    title: '书城',
    headerTitle: '书城',
    // header: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333',
    },
    gesturesEnabled: false,
  };

  state = {
    searchValue: '',
    iLoading: true,
    dataSource: this._cloneRows([]),
  };

  _cloneRows(rowAry) {
    return this._dataSource.cloneWithRows(rowAry); // eslint-disable-line
  }

  @autobind async _Search() {
    this.setState({
      isLoading: true,
    });
    const { searchValue } = this.state;
    await api.get(`/novel/search?name=${searchValue}`)
      .then(({ data }) => {
        if (data.status === 200) {
          this.setState({
            isLoading: false,
            dataSource: this._cloneRows(data.data),
          });
        }
      }).catch(e => new Error(`search faile!!:${e}`));
  }

  @autobind _renderRow(rowData) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.props.navigation.navigate('BookDetail', { book: rowData })}
        >
        <Book name={rowData.name} author={rowData.author} coverImg={rowData.image_url} type={rowData.type} />
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoading, dataSource } = this.state;
    return (
      <Container>
        <Header>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            // keyboardType="default"
            placeholder="搜索..."
            onChangeText={(searchValue) => this.setState({ searchValue })}
            onSubmitEditing={this._Search}
            style={{ height: 30, width: '90%', borderColor: '#bababa', borderWidth: 1, borderRadius: 5, paddingLeft: 10, backgroundColor: '#fff', alignSelf: 'center' }}
          />
        </Header>
        {isLoading
          && <ActivityIndicator animating={true} size="small" />
        }
        {!isLoading
          && <ListView
              style={{ width: '100%', height: '100%' }}
              dataSource={dataSource}
              renderRow={this._renderRow}
              enableEmptySections={true}
              showsVerticalScrollIndicator={false}
            />
        }
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  height: 50;
  background-color: #ff4f4e;
  justify-content: center;
  align-items: center;
`;
