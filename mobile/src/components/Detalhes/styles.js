import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';


export const Container= styled(LinearGradient).attrs({
  colors:['#A0C9D9','#e1e5e6'],
  start:{ x:0, y:0},
  end:{x:0,y:1},
})`
margin-bottom:15px;
padding:20px;
border-radius:10px;
flex:1;
`;


export const Link = styled.TouchableOpacity``;

export const Stat= styled.View`
flex-direction:row;
margin-right:20px;
margin-top:30px;
align-items:center;


`;

export const Title= styled.Text`
color: #131313;
font-size:20px;
margin-left:6px;

`;

export const Descricao= styled.Text`
color: #131313;
font-size:20px;
margin-top:40px;
line-height:20px;
`;

