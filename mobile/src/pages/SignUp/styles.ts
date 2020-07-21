import styled from 'styled-components/native';

export const LogoImg = styled.Image`
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 150px;
  height: 150px;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

export const ContainerButton = styled.View`
  width: 100%;
  height: 60px;
  background: #0190b0;
  border-radius: 10px;
  margin-bottom: 8px;
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
