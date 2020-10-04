import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';



export const Container = styled(LinearGradient).attrs({
    colors:['#A0C9D9','#e1e5e6'],
    start:{ x:0, y:1},
    end:{x:0,y:0},
  })`
    flex: 1;
  
  `;
export const Nome = styled.Text`
text-align: center;
font-size:28px;
margin-top:25px;
margin-bottom:25px;
color: #131313;
`;
export const NewLink = styled.TouchableOpacity`
justify-content: center;
align-items: center;
background-color: #ADD8E6;
width:90%;
height:45px;
border-radius: 10px;
margin-bottom: 10px;
`;
export const NewText = styled.Text`
font-size: 18px;
color: #131313;
font-weight: bold;
`;
export const Logout = styled.TouchableOpacity`
justify-content: center;
align-items: center;
background-color: #c62c36;
width: 90%;
height:45px;
border-radius:10px;
`;
export const LogoutText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight: bold;
`;

