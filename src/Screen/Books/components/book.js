import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';
import styled from 'styled-components/native';

export default class book extends Component {
  render() {
    return (
      <Container>
        <Image
          source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          style={{ height: 110, width: 80 }}
        />
        <BookInfo>
          <Text
            numberOfLines={1}
            style={{ fontSize: 13, lineHeight: 20, marginTop: 5 }}
            >
          {this.props.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 13, lineHeight: 20,marginBottom: 5 }}
            >
            {this.props.creator}
          </Text>
        </BookInfo>
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  height: 110;
  flex-direction: row;
  justify-content: flex-start;
  borderBottomWidth: 1;
  borderBottomColor: #c4cce6;
`;
const BookInfo = styled.View`
  margin-left: 15;
  justify-content: space-between;
`;
