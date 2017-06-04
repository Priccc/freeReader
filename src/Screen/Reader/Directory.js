import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react';
// import { SwRefreshListView } from 'react-native-swRefresh';
import { userStore, novelStore } from '../../Services/store';

import Book from '../Components/Book';

@observer
export default class Bookslist extends Component {
  _dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

  static navigationOptions = {
    title: '目录',
    headerTitle: '目录',
    // header: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333',
    },
    // gesturesEnabled: false,
  };

  state = {
    dataSource: this._cloneRows([]),
  };

  async componentDidMount() {
    await novelStore.getNovelDirectory();

    const ary = novelStore.novelDirectoryList.slice();
    this.setState({
      dataSource: this._cloneRows(ary),
    });
  }

  _cloneRows(rowAry) {
    return this._dataSource.cloneWithRows(rowAry); // eslint-disable-line
  }

  @autobind changeCurrentChapter(num) {
    novelStore.setProgress(num);
    this.props.navigation.dispatch(NavigationActions.back());
  }

  @autobind _renderRow(rowData, sectionId, rowId) {
    const activeColor = novelStore.progress === rowId ? '#f16046' : '#333';

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.changeCurrentChapter(rowId)}
        >
        <DirectoryItem>
          <Text
            style={{ color: activeColor, fontSize: 16 }}
            >{rowData.title}</Text>
        </DirectoryItem>
      </TouchableOpacity>
    );
  }

  render() {
    const { dataSource } = this.state;

    return (
      <Container>
        <ListView
          style={{ width: '100%', height: '100%' }}
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
          isShowLoadMore={false}
          // showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const DirectoryItem = styled.View`
  width: 100%;
  height: 40;
  padding-left: 20;
  justify-content: center;
  align-items: flex-start;
  border-bottom-width: 1;
  border-bottom-color: #888888;
`;
