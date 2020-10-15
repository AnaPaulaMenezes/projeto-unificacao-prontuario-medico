import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export const LogoImg = styled.Image`
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 150px;
  height: 150px;
`;

export const Container = styled(LinearGradient).attrs({
  colors:['#A0C9D9','#e1e5e6'],
  start:{ x:0, y:1},
  end:{x:0,y:0},
})`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-family: 'Roboto-Medium';
  margin: 30px;
`;

export const Text = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;

export const ButtonSigIn = styled.TouchableOpacity`
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonForgotPassword = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
`;
