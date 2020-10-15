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

} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { validarCPF } from '../../utils/validarCPF';


import api from '../../api';

interface SignUpFormatData {
  nome_Usuario: string;
  cpf_Usuario: string;
  rg_Usuario: string;
  email_Usuario: [{
    endereco_Email: string,
    codTipo_Email: number,
  }];
  senha_Usuario: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const nameRef = useRef<TextInput>(null);
  const RGRef = useRef<TextInput>(null);
  const CPFRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(
    async (data: SignUpFormatData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome_Usuario: Yup.string().required('Nome obrigatório'),
          cpf_Usuario: Yup.string().required('CPF obrigatório'),
          rg_Usuario: Yup.string().required('RG obrigatório'),
          email_Usuario: Yup.string().email('Digite um e-mail válido'),
          senha_Usuario: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const validateCPF = validarCPF(data.cpf_Usuario);

        if (!validateCPF) {

          throw new Error('CPF Inválido');
        }

        if (data.email_Usuario) {
          const newData = {
            ...data, email_Usuario: [{
              endereco_Email: data.email_Usuario,
              codTipo_Email: 1
            }]
          }
          await api.post('/users', newData);
        } else {
          await api.post('/users', data);
        }

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
          err.message ? err.message : 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );

      }
    },
    [navigation],
  );

  return (
    <>

          <Container>
            <Title>Faça seu cadastro</Title>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                ref={nameRef}
                name="nome_Usuario"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  CPFRef.current?.focus();
                }}
                placeholder="Nome Completo"
              />

              <Input
                ref={CPFRef}
                mask="cpf"
                maxLength={14}
                name="cpf_Usuario"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  RGRef.current?.focus();
                }}
              />

              <Input
                ref={RGRef}
                mask="rg"
                maxLength={12}
                name="rg_Usuario"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="RG"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
              />



              <Input
                ref={emailRef}
                name="email_Usuario"
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
                name="senha_Usuario"
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

    </>
  );
};
export default SignUp;
