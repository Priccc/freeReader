import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react';
import { SwRefreshListView } from 'react-native-swRefresh';
import { userStore, novelStore } from '../../Services/store';

import Book from '../Components/Book';

export default class Bookslist extends Component {
  _dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

  static navigationOptions = {
    title: '书架',
    headerTitle: '书架',
    // header: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333',
    },
    gesturesEnabled: false,
  };

  state = {
    isNull: false,
    isLoading: true,
    dataSource: this._cloneRows([]),
  };

  async componentDidMount() {
    const { _id } = userStore.current;
    await novelStore.getNovelList(_id);
    const ary = novelStore.novelList.slice();
    this.setState({
      isNull: Boolean(ary.length),
      isLoading: false,
      dataSource: this._cloneRows(ary),
    });

    // if (_id) {
    //   await this.getBooksList(_id);
    // }
  }

  @autobind async pullRefresh(end) {
    const { _id } = userStore.current;
    await novelStore.getNovelList(_id);
    const ary = novelStore.novelList.slice();
    this.setState({
      isNull: Boolean(ary.length),
      isLoading: false,
      dataSource: this._cloneRows(ary),
    });
    end();
  }

  // getBooksList(uid) {
  //   api.get(`/novel/list?uid=${uid}`)
  //     .then(({ data }) => {
  //       if (data.status === 200) {
  //         this.setState({
  //           isNull: Boolean(data.data.length),
  //           isLoading: false,
  //           dataSource: this._cloneRows(data.data),
  //         });
  //         console.log(this.state.dataSource);
  //       } else {
  //         logger.error(new Error('Failed to pull the information list!!'));
  //       }
  //     }).catch(e => new Error(`Failed to pull the information list!!:${e}`));
  // }

  _cloneRows(rowAry) {
    return this._dataSource.cloneWithRows(rowAry); // eslint-disable-line
  }

  @autobind gotoReader(novel) {
    novelStore.setCurrentNovel(novel);
    this.props.navigation.navigate('BookReader');
  }

  @autobind _renderRow(rowData) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.gotoReader(rowData)}
        >
        <Book name={rowData.name} author={rowData.author} coverImg={rowData.image_url} type={rowData.type} />
      </TouchableOpacity>
    );
  }

  render() {
    const { isNull, dataSource, isLoading } = this.state;

    if (isLoading) {
      return <ActivityIndicator animating={true} size="large" style={{ marginTop: 50 }} />
    }

    return (
      <Container>
        <SwRefreshListView
          style={{ width: '100%', height: '100%' }}
          dataSource={dataSource}
          renderRow={this._renderRow}
          onRefresh={this.pullRefresh}
          enableEmptySections={true}
          isShowLoadMore={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
        {!isNull
          && <Text style={{ fontSize: 16, color: '#838383', position: 'absolute', top: 200 }}>您还没有添加任何书籍，请去添加。</Text>
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
