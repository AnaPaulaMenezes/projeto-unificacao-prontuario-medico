import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Component } from 'react';


export const Container = styled(LinearGradient).attrs({
  colors:['#A0C9D9','#e1e5e6'],
  start:{ x:0, y:1},
  end:{x:0,y:0},
})`
  flex: 1;

`;

export const List = styled.FlatList.attrs({
  contentContainerStyle:{paddingHorizontal:20},
  showsVerticalScrollIndicator:false,

  })`
  margin-top:20px;
  `;

export const Form = styled.View`
  flex-direction:row;
  margin-top:10px;
  padding:0 20px;
`;

export const Nome = styled.Text`
  flex: 1;
  padding: 12px 15px;
  font-size: 28px;
  margin-top:25px;
  margin-bottom:25px;
  color: #ffff;
`;

export const NewLink = styled.TouchableOpacity`
justify-content:center;
background-color: #6d90a6;
border-radius:100px;
margin-left:20px;
padding: 0 14px;
height:50px;
margin-top:35px;

`;


