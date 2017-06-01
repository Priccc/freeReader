import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

export default class book extends Component {
  render() {
    const { name, author, coverImg, type } = this.props;
    /*eslint-disable*/
    return (
      <Container>
        {coverImg
          ? <Image
              source={{ uri: coverImg }}
              style={{ height: 110, width: 80 }}
              resizeMode="cover"
            />
          : <Image
              source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
              style={{ height: 110, width: 80 }}
              resizeMode="cover"
            />
        }
        <BookInfo>
          <Text
            numberOfLines={1}
            style={{ fontSize: 17, lineHeight: 20, marginTop: 5, fontWeight: '500' }}
            >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 15, lineHeight: 20, marginBottom: 5 }}
            >
            {author}
          </Text>
        </BookInfo>
        <BookTags>
          {type
            && <Tag>
                <Text
                  style={{ fontSize: 12 }}
                  >{type.replace(/小说/, '')}</Text>
              </Tag>
          }
        </BookTags>
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

const BookTags = styled.View`
  position: absolute;
  right: 10;
  bottom: 5;
  justify-content: flex-end;
  align-items: center;
`;

const Tag = styled.View`
  height: 18;
  padding: 0 10;
  border-width: 1;
  border-color: #d678cd;
  border-radius: 5;
  justify-content: center;
  align-items: center;;
`;
