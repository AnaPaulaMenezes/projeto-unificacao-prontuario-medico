import React, {useEffect}from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.png';
import {
  Container,
  ButtonSigIn,
  ButtonForgotPassword,
  Title,
  Text,
  LogoImg,
} from './styles';
import api from '../../api';

const History: React.FC = () => {
  const navigation = useNavigation();

  useEffect(()=>{
    api.get('users').then((response) =>{
      console.log('resp', response.status)
    })
  })
  return (

    <>
      <Container>
        <Text>Bem Vindo!</Text>
      </Container>
    </>
  );
};
export default History;
