import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ListView, ScrollView, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native'; // eslint-disable-line
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { userStore, novelStore } from '../../Services/store';
import Util from '../../Services/utils';

@observer
export default class reader extends Component {
  _dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

  static navigationOptions = {
    title: '正文',
    header: null,
    tabBarVisible: false,
    gesturesEnabled: false,
  };

  state = {
    hide: true,
    offset: new Animated.Value(0),
    opacity: new Animated.Value(0),
    dataSource: this._cloneRows([]),
    prevOffset: -110,
    nextOffset: -110,
    display: 'none',
  }

  _cloneRows(rowAry) {
    return this._dataSource.cloneWithRows(rowAry); // eslint-disable-line
  }

  async componentWillMount() {
    await novelStore.getServiceProgress();
  }

  goBack() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  goDerictory() {
    this.props.navigation.navigate('Directory');
  }

  handleScroll(e) {
    // console.log(e.nativeEvent.contentOffset.x);
    const { prevOffset, nextOffset } = this.state;
    const x = e.nativeEvent.contentOffset.x;

    const endx = (novelStore.totalPage - 1) * 375;

    if (x < 0) {
      this.setState({
        display: 'flex',
        prevOffset: -110 - (x * 20) >= 0 ? 0 : -110 - (x * 20),
      });
    }
    if (x > endx) {
      this.setState({
        display: 'flex',
        nextOffset: -110 + ((x - endx) * 20) >= 0 ? 0 : -110 + ((x - endx) * 20),
      });
    }
    if (x >= 0 && x <= endx) {
      if (prevOffset > -20) {
        console.log('prev');
        if (novelStore.progress > 0) {
          novelStore.setProgress(parseInt(novelStore.progress) - 1);
          this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: false });
        }
      }
      if (nextOffset > -20) {
        console.log('next');
        novelStore.setProgress(parseInt(novelStore.progress) + 1);
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: false });
      }
      this.setState({
        display: 'none',
        prevOffset: -110,
        nextOffset: -110,
      });
    }
  }

  @autobind renderRow(rowData, sectionId, rowId) {
    return (
      <Page
        activeOpacity={1}
        onPress={() => this.show()}
        >
        <PageTitle>
          <Text
            style={{ color: '#4f4f4f' }}
            >{novelStore.currentChapter.title}</Text>
        </PageTitle>
        <PageContent>
          {rowData.map((value, index) =>
            <Text
              key={index}
              style={{ color: '#3A3328', textAlign: 'left', fontSize: 17, letterSpacing: 1.5 }}
              // adjustsFontSizeToFit={true}
              allowFontScaling={true}
              numberOfLines={1}
              selectable={false}
              >{value}</Text>
          )}
        </PageContent>
        <PageFooter>
          <Text
            style={{ color: '#4f4f4f' }}
            >{`${parseInt(rowId) + 1}/${novelStore.totalPage}`}</Text>
        </PageFooter>
      </Page>
    );
  }

  @autobind contentPage() {
    const { currentChapter } = novelStore;
    const content = Util.handleContent(currentChapter.content.replace(/&nbsp;/ig, ''));

    novelStore.setTotalPage(content.length);

    return (
      <ListView
        enableEmptySections
        horizontal={true}
        pagingEnabled={true}
        initialListSize={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        dataSource={this._cloneRows(content)}
        renderRow={this.renderRow}
      />
    );
  }

  render() {
    const { progress, currentChapter } = novelStore;
    const { prevOffset, nextOffset, display } = this.state;

    if (!currentChapter) {
      return <ActivityIndicator animating={true} size="large" style={{ marginTop: 50 }} />
    }

    return (
      <Container>
        <ScrollView
          ref='scrollView'
          horizontal={true}
          scrollEventThrottle={2000}
          onScroll={(e) => this.handleScroll(e)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          >
          {this.contentPage()}
        </ScrollView>
        <PrevView offset={prevOffset} display={display}>
          {progress === 0
            ? <Text style={{ color: '#fff' }}>已经是第一章</Text>
            : <Text style={{ color: '#fff' }}>上一章</Text>
          }
        </PrevView>
        <NextView offset={nextOffset} display={display}>
          <Text style={{ color: '#fff' }}>下一章</Text>
        </NextView>
        { this.state.hide ? null : this.showReaderOptions() }
      </Container>
    );
  }

  showReaderOptions(){
    return (
      <View style={styles.alertContainer} >
        <Animated.View style={{transform: [{
               translateY: this.state.offset.interpolate({
               inputRange: [0, 1],
               outputRange: [-70, 0]
              }),
            }]
          }}>
          <TouchableOpacity
          style={styles.alertTop}
          onPress={() => this.goBack()}>
            <Image style={styles.backImg} source={require('../../assets/BackArrow.png')} />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={{ height: Util.size.height - 120 }}
          onPress={this.iknow.bind(this)}>
        </TouchableOpacity>
        <Animated.View style={{ transform: [{
              translateY: this.state.offset.interpolate({
               inputRange: [0, 1],
               outputRange: [50, 0]
              }),
            }]
          }}>
          <TouchableOpacity
            style={styles.alertFoot}
            onPress={() => this.goDerictory()}>
            <Image style={styles.directoryImg} source={require('../../assets/books.png')} />
            <Text style={{ fontSize: 12, color: '#fff', lineHeight: 20 }}>目录</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  // 显示动画
  in() {
    Animated.parallel([

      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 1,
        }
      ),
    ]).start();
  }

  // 隐藏动画
  out() {
    Animated.parallel([
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 0,
        }
      ),
    ]).start((finished) => this.setState({ hide: true }));
  }

  // 取消
  iknow() {
    if (!this.state.hide) {
      this.out();
    }
  }

  show() {
    if (this.state.hide) {
      this.setState({ hide: false }, this.in);
    }
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Util.size.width,
    height: Util.size.height,
  },
  alertTop: {
    height: 70,
    backgroundColor: 'rgba(59, 58, 56, 0.9)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alertFoot: {
    height: 50,
    // flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: 'rgba(59, 58, 56, 0.9)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backImg: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  directoryImg: {
    width: 20,
    height: 20,
    marginLeft: 2.5,
  },
});

const Container = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  ${''/* background-color: rgba(131, 109, 0, 0.7); */}
  background-color: #D4C5A4;
  padding-top: 22;
`;

const PrevView = styled.View`
  height: ${Util.size.height};
  width: 110;
  position: absolute;
  top: 0;
  left: ${(props) => props.offset};
  z-index: 999;
  background-color: rgba(31, 31, 31, 0.8);
  justify-content: center;
  align-items: center;
  display: ${(props) => props.display};
`;

const NextView = styled.View`
  height: ${Util.size.height};
  width: 110;
  position: absolute;
  top: 0;
  right: ${(props) => props.offset};
  z-index: 999;
  background-color: rgba(31, 31, 31, 0.8);
  justify-content: center;
  align-items: center;
  display: ${(props) => props.display};
`;

const Page = styled.TouchableOpacity`
  width: ${Util.size.width};
  height: ${Util.size.height - 22};
  justify-content: center;
  align-items: center;
  padding: 0 15;
`;
const PageTitle = styled.View`
  height: 5%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const PageContent = styled.View`
  height: 90%;
  ${''/* width: 100%; */}
  justify-content: space-around;
  align-items: flex-start;
`;
const PageFooter = styled.View`
  height: 5%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
