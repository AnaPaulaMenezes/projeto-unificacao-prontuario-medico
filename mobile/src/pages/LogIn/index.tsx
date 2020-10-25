import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  TextInput,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  ButtonSigIn,
  ButtonForgotPassword,
  Title,
  Text,
  LogoImg,
} from './styles';

interface LogInFormData {
  cpf_Usuario: string;
  senha_Usuario: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { logIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cpf_Usuario: Yup.string().required('CPF obrigatório'),

          senha_Usuario: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await logIn({
          cpf_Usuario: data.cpf_Usuario,
          senha_Usuario: data.senha_Usuario,
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu erro ao fazer login, cheque as credenciais',
        );
      }

    },
    [logIn, navigation],
  );


  return (
    <>

      <Container>
        <LogoImg source={logoImg} />

        <Title>Faça seu login</Title>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <Input
            ref={cpfInputRef}
            name="cpf_Usuario"
            mask="cpf"
            maxLength={14}
            placeholder="CPF"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            name="senha_Usuario"
            placeholder="Senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
              </Button>



          <ButtonSigIn onPress={() => navigation.navigate('SignUp')}>
            <Text>Cadastre-se</Text>
          </ButtonSigIn>
        </Form>
      </Container>

    </>
  );
};
export default LogIn;
