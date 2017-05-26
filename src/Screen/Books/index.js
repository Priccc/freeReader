import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';

import Json from '../../../static/book_json'

import Book from './components/book';

export default class booklist extends Component {
  _dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

  static navigationOptions = {
    header: null,
  };

  state = {
    dataSource: this._cloneRows(Json),
  };

  _cloneRows(rowAry) {
    return this._dataSource.cloneWithRows(rowAry); // eslint-disable-line
  }

  gotoReader() {
    this.props.navigation.navigate('BookReader');
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity
        onPress={this.gotoReader.bind(this)}
        >
        <Book title={rowData.meta.title} creator={rowData.meta.creator}></Book>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>

        <ListView
          style={{ width: '100%', height: '100%' }}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  padding-top: 22;
`;
