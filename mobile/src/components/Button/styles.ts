import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 60px;
  background: #0190b0;
  border-radius: 10px;
  margin-bottom: 8px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'Roboto-Medium';
  margin: 0;
`;
