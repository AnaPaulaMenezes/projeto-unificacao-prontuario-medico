import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import logoImg from '../../assets/logo.png';
import {
  Container,
  ButtonSigIn,
  ButtonForgotPassword,
  Title,
  Text,
  LogoImg,
} from './styles';

const LogIn: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <Text>Bem Vindo!</Text>
      </Container>
    </>
  );
};
export default LogIn;
