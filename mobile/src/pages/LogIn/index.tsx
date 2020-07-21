import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { TextInput, Alert,  ScrollView,
  Platform,
  KeyboardAvoidingView, } from 'react-native';
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
  cpf: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { logIn } = useAuth();

  const handleSubimit = useCallback(
    async (data: LogInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório'),

          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await logIn({
          cpf: data.cpf,
          password: data.password,
        });
        navigation.navigate('History');
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView >
      <Container>
      <LogoImg source={logoImg} />

        <Title>Faça seu login</Title>

        <Form ref={formRef} onSubmit={handleSubimit} style={{ width: '100%' }}>
          <Input
            name="cpf"
            placeholder="CPF"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            name="password"
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

          <ButtonForgotPassword>
            <Text>Esqueci minha senha</Text>
          </ButtonForgotPassword>

          <ButtonSigIn onPress={() => navigation.navigate('SignUp')}>
            <Text>Cadastre-se</Text>
          </ButtonSigIn>
        </Form>
      </Container>
      </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default LogIn;
