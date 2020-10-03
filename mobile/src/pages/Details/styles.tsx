import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors:['#A0C9D9','#e1e5e6'],
  start:{ x:0, y:0},
  end:{x:0,y:1},
})`
  flex: 1;

`;

export const Nome = styled.Text`
  flex: 1;
  padding: 12px 15px;
  font-size: 28px;
  margin-top:25px;
  margin-bottom:25px;
  color: #ffff;
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
