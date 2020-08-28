import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Title,
  Text,
  ButtonSigIn,
  ButtonForgotPassword,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

import api from '../../api';

interface SignUpFormatData {
  name: string;
  cpf: string;
  rg: string;
  born: Date;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const nameRef = useRef<TextInput>(null);
  const RGRef = useRef<TextInput>(null);
  const CPFRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const bornRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormatData) => {
      try {
        formRef.current?.setErrors({});

        console.log(data);
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string().required('CPF obrigatório'),
          rg: Yup.string().required('RG obrigatório'),
          email: Yup.string().email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigation.goBack();

        Alert.alert(
          'Cadastro realizado',
          'Você já pode fazer seu login na aplicação',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro ao cadastrar',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
        console.log(err.message);
      }
    },
    [navigation],
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
            <Title>Faça seu cadastro</Title>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                ref={nameRef}
                name="name"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  CPFRef.current?.focus();
                }}
                placeholder="Nome Completo"
              />

              <InputMask
                inputRef={CPFRef}
                name="cpf"
                type="cpf"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  RGRef.current?.focus();
                }}
              />

              <InputMask
                inputRef={RGRef}
                type={'custom'}
                options={{
                  mask: '99.999.999-S',

                  getRawValue: function(value:string) {

                    return value.replace('.','').replace('.','').replace('-','');
                  },
                }}
                name="rg"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="RG"
                returnKeyType="next"
                onSubmitEditing={() => {
                  bornRef.current?.focus();
                }}
              />

              <InputMask
                inputRef={bornRef}
                name="born"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
                placeholder="Data de nascimento"
              />

              <Input
                ref={emailRef}
                name="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                placeholder="E-mail"
              />

              <Input
                name="password"
                ref={passwordRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                placeholder="Senha"
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <ButtonSigIn onPress={() => navigation.goBack()}>
        <Text>Voltar</Text>
      </ButtonSigIn>
    </>
  );
};
export default SignUp;
