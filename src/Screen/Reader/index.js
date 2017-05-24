import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

export default class reader extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  render() {
    return (
      <Container>
        <Text>{2222}</Text>
      </Container>
    );
  }
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 22;
`;
