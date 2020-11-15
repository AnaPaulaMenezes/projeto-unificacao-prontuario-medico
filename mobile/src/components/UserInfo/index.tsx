import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Info, Text, Content, Title, Line, UserInfo, ButtonArea, InfoModal, Invisible, ModalData, ModalAddress } from './styles';
import { SafeAreaView, View, Alert, TouchableHighlight, TextInput, Button, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Input from '../Input';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../api';
import { useAuth } from '../../hooks/auth';
import DatePicker from 'react-native-datepicker';
import { format, parseISO, startOfHour } from 'date-fns';

interface EditData {
  nome_Usuario: string;
  cpf_Usuario: string;
  email1_Usuario: string;
  telefone1_Usuario: string;
  senha_Usuario: string
  novaSenha_Usuario: string
};

interface EditAddress {
  Id_Endereco: number;
  Id_Usuario: number;
  logradouro_Endereco: string;
  cep_Endereco: number;
  numero_Endereco: string;
  bairro_Endereco: string;
  cidade_Endereco: string;
  estado_Endereco: string;
  pais_Endereco: string;
  complemento_Endereco: string;
};

interface EditPatient {
  Id_Paciente: number,
  tipoSanguineo_Paciente: string,
  altura_Paciente: number,
  peso_Paciente: string,
  obs_Paciente: string,
  alergias_Paciente: string,
  doencasCronicas_Paciente: string,
  remediosContinuos_Paciente: string
}

export default function ProfileInfo({ data }) {
  const navigation = useNavigation();
  const { usuario, updateUser } = useAuth();

  const getSelectedData = async (): Promise<any> => {
    let state: unknown;

    await setSelectedData((currentState) => {
      state = currentState;

      return currentState;
    });

    return state;
  };

  const retornaDataNascimento = () => {
    if (usuario.dtNascimento_Usuario) {
      return format(parseISO(usuario.dtNascimento_Usuario.toString()), 'dd-MM-yyyy');
    }
    return '';
  }

  const InitialUserData = {
    nome_Usuario: usuario.nome_Usuario,
    cpf_Usuario: usuario.cpf_Usuario,
    rg_Usuario: usuario.rg_Usuario,
    dtNascimento_Usuario: usuario.dtNascimento_Usuario,
    email1_Usuario: usuario.emails[0]?.endereco_Email,
    telefone1_Usuario: usuario.telefones[0]?.numero_Telefone
  }

  const InitialAddressData = {
    Id_Endereco: usuario.endereco?.Id_Endereco,
    Id_Usuario: usuario.Id_Usuario,
    logradouro_Endereco: usuario.endereco?.logradouro_Endereco,
    cep_Endereco: usuario.endereco?.cep_Endereco,
    numero_Endereco: usuario.endereco?.numero_Endereco,
    bairro_Endereco: usuario.endereco?.bairro_Endereco,
    cidade_Endereco: usuario.endereco?.cidade_Endereco,
    estado_Endereco: usuario.endereco?.estado_Endereco,
    pais_Endereco: usuario.endereco?.pais_Endereco,
    complemento_Endereco: usuario.endereco?.complemento_Endereco,
  }

  const InitialPatientData = {
    Id_Paciente: usuario.paciente.Id_Paciente,
    tipoSanguineo_Paciente: usuario.paciente.tipoSanguineo_Paciente,
    altura_Paciente: usuario.paciente.altura_Paciente?.toString(),
    peso_Paciente: usuario.paciente.peso_Paciente?.toString(),
    obs_Paciente: usuario.paciente.obs_Paciente,
    alergias_Paciente: usuario.paciente.alergias_Paciente,
    doencasCronicas_Paciente: usuario.paciente.doencasCronicas_Paciente,
    remediosContinuos_Paciente: usuario.paciente.remediosContinuos_Paciente
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [aviso, onChangeAviso] = React.useState("")
  const [selectedData, setSelectedData] = useState(retornaDataNascimento());

  //Forms refs
  const formRef = useRef<FormHandles>(null);
  const formEndRef = useRef<FormHandles>(null);
  const formPatientRef = useRef<FormHandles>(null);

  //usuario refs
  const nameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const dtNascRef = useRef<TextInput>(null);
  const senhaAtualRef = useRef<TextInput>(null);
  const senhaNovaRef = useRef<TextInput>(null);
  const senhaconfirmaRef = useRef<TextInput>(null);
  const rgRef = useRef<TextInput>(null);
  const telRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  //enderoco refs
  const cepEndRef = useRef<TextInput>(null);
  const logRef = useRef<TextInput>(null);
  const numEndRef = useRef<TextInput>(null);
  const bairroEndRef = useRef<TextInput>(null);
  const cidadeEndRef = useRef<TextInput>(null);
  const estadoEndRef = useRef<TextInput>(null);
  const complementoEndRef = useRef<TextInput>(null);

  //paciente refs
  const alturaRef = useRef<TextInput>(null);
  const pesoRef = useRef<TextInput>(null);
  const doencasRef = useRef<TextInput>(null);
  const remediosRef = useRef<TextInput>(null);
  const alergiaRef = useRef<TextInput>(null);
  const obsRef = useRef<TextInput>(null);
  const tipoSangueRef = useRef<TextInput>(null);

  useEffect(() => { console.log(selectedData) }, [])
  const editUserInfo = useCallback(
    async (data: EditData) => {
      try {

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome_Usuario: Yup.string().required('Nome obrigatório'),
          email1_Usuario: Yup.string().email('Digite um e-mail válido'),
          senha_Usuario: Yup.string(),
          novaSenha_Usuario: Yup.string().when('senha_Usuario', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          confirmarSenha_Usuario: Yup.string()
            .when('senha_Usuario', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('novaSenha_Usuario'), undefined], 'Confirmação incorreta')

        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //formatar data de nascimento para o padrao yyyy/mm/dd
        const DataSelecionada = await getSelectedData();

        const DtNasc = DataSelecionada.split('/')
        console.log(DtNasc.length)
        const formatedNasc = DtNasc.length === 3
          ? `${DtNasc[2]}-${DtNasc[1].slice(-2)}-${DtNasc[0].slice(-2)}`
          : new Date();


        const formatedData = {
          nome_Usuario: data.nome_Usuario,
          dtNascimento_Usuario: formatedNasc,
          senha_Usuario: data.senha_Usuario,
          novaSenha_Usuario: data.novaSenha_Usuario,

          email_Usuario: [{
            id_Email: usuario.emails[0]?.id_Email ? usuario.emails[0].id_Email : null,
            endereco_Email: data.email1_Usuario,
            codTipo_Email: 1
          },
          ],

          telefone_Usuario: [{
            Id_Telefone: usuario.telefones[0]?.Id_Telefone ? usuario.telefones[0].Id_Telefone : null,
            numero_Telefone: data.telefone1_Usuario,
            codTipo_Telefone: 1
          }]
        }


        const response = await api.put('/users', formatedData);

        await updateUser(response.data);

        setModalVisible(false)

        Alert.alert(
          '',
          'Alteração Realizada com Sucesso',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro ao cadastrar',
          err.message ? err.message : 'Ocorreu um erro ao editar usuario, tente novamente.',
        );

      }
    }
    , []);


  const editAddress = useCallback(async (data: EditAddress) => {
    try {
      console.log(data)
      formEndRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cep_Endereco: Yup.string().required('CEP obrigatório'),
        logradouro_Endereco: Yup.string().required('Logradouro obrigatório'),
        numero_Endereco: Yup.string().required('Numero obrigatório'),
        bairro_Endereco: Yup.string().required('Bairro obrigatório'),
        cidade_Endereco: Yup.string().required('Cidade obrigatório'),
        estado_Endereco: Yup.string().required('Estado obrigatório'),

      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formatedData = {
        Id_Endereco: usuario.endereco?.Id_Endereco ? usuario.endereco.Id_Endereco : null,
        Id_Usuario: usuario.Id_Usuario,
        logradouro_Endereco: data.logradouro_Endereco,
        cep_Endereco: data.cep_Endereco,
        numero_Endereco: data.numero_Endereco,
        bairro_Endereco: data.bairro_Endereco,
        cidade_Endereco: data.cidade_Endereco,
        estado_Endereco: data.estado_Endereco,
        pais_Endereco: 'Brasil',
        complemento_Endereco: data.complemento_Endereco,
      }
      console.log('formatedData', formatedData);

      let response;

      //Se tem id edita, senão cria o endereco
      if (formatedData.Id_Endereco) {
        response = await api.put('/users/endereco', formatedData);
      } else {
        response = await api.post('/users/endereco', formatedData);
      }

      updateUser({ ...usuario, endereco: response.data })
      setModalVisible2(false);

      Alert.alert(
        '',
        'Alteração Realizada com Sucesso',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formEndRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro ao cadastrar',
        err.message ? err.message : 'Ocorreu um erro ao editar o endereço, tente novamente.',
      );

    }
  }, []);

  const editPatient = useCallback(async (data: EditPatient) => {
    try {
      console.log(data)
      formPatientRef.current?.setErrors({});

      const schema = Yup.object().shape({

      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formatedData = {
        Id_Paciente: usuario.paciente.Id_Paciente,
        tipoSanguineo_Paciente: data.tipoSanguineo_Paciente,
        altura_Paciente: Number(data.altura_Paciente),
        peso_Paciente: Number(data.peso_Paciente),
        obs_Paciente: data.obs_Paciente,
        alergias_Paciente: data.alergias_Paciente,
        doencasCronicas_Paciente: data.doencasCronicas_Paciente,
        remediosContinuos_Paciente: data.remediosContinuos_Paciente
      }
      console.log('formatedData', formatedData);

      const response = await api.put('/users/paciente', formatedData);

      updateUser({ ...usuario, paciente: response.data })

      setModalVisible3(false);

      Alert.alert(
        '',
        'Alteração Realizada com Sucesso',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formEndRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro ao cadastrar',
        err.message ? err.message : 'Ocorreu um erro ao editar o endereço, tente novamente.',
      );
    }
  }, []);


  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <Title>Editar informações</Title>
            <Info>
              <Content>
                <UserInfo>Informações Hospitalares</UserInfo>
              </Content>
              <Line></Line>

              <ButtonArea>
                <Button onPress={() => { setModalVisible3(true) }}
                  title="Editar"
                >
                </Button>
              </ButtonArea>
            </Info>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Title></Title>
            <Info>
              <Content>
                <UserInfo>Dados pessoais</UserInfo>
              </Content>
              <Line></Line>
              <ButtonArea>
                <Button onPress={() => { setModalVisible(true) }}
                  title="Editar"
                >
                </Button>
              </ButtonArea>
            </Info>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Title> </Title>
            <Info>
              <Content>
                <UserInfo>Endereço</UserInfo>
              </Content>
              <Line></Line>
              <ButtonArea>
                <Button onPress={() => { setModalVisible2(true) }}
                  title="Editar"
                >
                </Button>
              </ButtonArea>
            </Info>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <ScrollView>
            <View style={{ backgroundColor: "#000000aa" }}>
              <View style={{ alignSelf: "center" }}>
                <ModalData>
                  <Form
                    initialData={InitialUserData}
                    ref={formRef}
                    onSubmit={editUserInfo}
                    style={{ width: '100%' }}
                  >
                    <Content>
                      <Text style={{ marginBottom: 5 }}>CPF</Text>
                      <Input
                        name="cpf_Usuario"
                        placeholder="CPF"
                        editable={false}
                        mask="cpf"
                        ref={cpfRef}
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>RG</Text>
                      <Input
                        name="rg_Usuario"
                        placeholder="RG"
                        editable={false}
                        mask="rg"
                        ref={rgRef}
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Nome</Text>
                      <Input
                        ref={nameRef}
                        name="nome_Usuario"
                        placeholder="Nome"
                      />
                    </Content>
                    <Line></Line>
                    <Content>

                      <Text style={{ marginBottom: 5 }}>Data Nascimento</Text>
                      <DatePicker
                        style={{ width: '100%' }}
                        mode="date"
                        format="DD/MM/yyyy"
                        date={selectedData}
                        onDateChange={(value) => {
                          console.log(value)
                          setSelectedData(value)
                        }}
                      ></DatePicker>
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Senha Atual</Text>
                      <Input
                        ref={senhaAtualRef}
                        name="senha_Usuario"
                        placeholder="Senha Atual"
                        secureTextEntry
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Nova Senha</Text>
                      <Input
                        ref={senhaNovaRef}
                        name="novaSenha_Usuario"
                        placeholder="Nova Senha"
                        secureTextEntry
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Confirmar Senha</Text>
                      <Input
                        ref={senhaconfirmaRef}
                        name="confirmarSenha_Usuario"
                        placeholder="Confirmar Senha"
                      />
                    </Content>

                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>E-mail</Text>
                      <Input
                        name="email1_Usuario"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="E-mail"
                        ref={emailRef}
                      />
                      <Text style={{ color: 'red' }}>{aviso}</Text>

                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Telefone</Text>
                      <Input
                        ref={telRef}
                        name="telefone1_Usuario"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Telefone"
                        mask="phone"
                      />
                    </Content>
                    <ButtonArea style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Button title="Confirmar"
                        onPress={() => {
                          formRef.current?.submitForm();
                        }}
                      >
                      </Button>
                      <Button title="Cancelar"
                        onPress={() => {
                          setModalVisible(false)
                          onChangeAviso("")
                        }}>
                      </Button>
                    </ButtonArea>
                  </Form>
                </ModalData>

              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>

      <View>
        <Modal
          ////Endereco////
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
        >
          <View style={{ backgroundColor: "#000000aa" }}>
            <ScrollView>
              <View style={{ alignSelf: "center" }}>
                <ModalAddress>
                  <Form
                    ref={formEndRef}
                    initialData={InitialAddressData}
                    onSubmit={editAddress}
                    style={{ width: '100%' }}
                  >
                    <Content>
                      <Text style={{ marginBottom: 5 }}>CEP</Text>
                      <Input
                        ref={cepEndRef}
                        name="cep_Endereco"
                        placeholder="CEP"
                        mask="cep"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Rua</Text>
                      <Input
                        ref={logRef}
                        name="logradouro_Endereco"
                        placeholder="Logradouro"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Número</Text>
                      <Input
                        ref={numEndRef}
                        name="numero_Endereco"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Número"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Bairro</Text>
                      <Input
                        ref={bairroEndRef}
                        name="bairro_Endereco"
                        placeholder="Bairro"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Cidade</Text>
                      <Input
                        ref={cidadeEndRef}
                        name="cidade_Endereco"
                        placeholder="Cidade"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Estado</Text>
                      <Input
                        ref={estadoEndRef}
                        name="estado_Endereco"
                        placeholder="Estado"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Complemento</Text>
                      <Input
                        ref={complementoEndRef}
                        name="complemento_Endereco"
                        placeholder="Complemento"
                      />
                    </Content>

                    <ButtonArea style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Button title="Confirmar"
                        onPress={() => {
                          formEndRef.current?.submitForm();
                        }}
                      >
                      </Button>
                      <Button title="Cancelar"
                        onPress={() => {
                          setModalVisible2(false)
                        }}>
                      </Button>
                    </ButtonArea>
                  </Form>
                </ModalAddress>

              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          /// Paciente ///
          animationType="slide"
          transparent={true}
          visible={modalVisible3}

        >
          <View style={{ backgroundColor: "#000000aa" }}>
            <ScrollView>
              <View style={{ alignSelf: "center" }}>
                <InfoModal>
                  <Form
                    ref={formPatientRef}
                    onSubmit={editPatient}
                    style={{ width: '100%' }}
                    initialData={InitialPatientData}
                  >
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Altura</Text>
                      <Input
                        ref={alturaRef}
                        name="altura_Paciente"
                        keyboardType="numeric"
                        returnKeyType="next"
                        placeholder="Altura"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Peso</Text>
                      <Input
                        ref={pesoRef}
                        name="peso_Paciente"
                        keyboardType="numeric"
                        returnKeyType="next"
                        placeholder="Peso"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Alergias</Text>
                      <Input
                        ref={alergiaRef}
                        name="alergias_Paciente"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Alergias"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Doenças Crônicas</Text>
                      <Input
                        ref={doencasRef}
                        name="doencasCronicas_Paciente"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Doenças Crônicas"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Remédios Contínuos</Text>
                      <Input
                        ref={remediosRef}
                        name="remediosContinuos_Paciente"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Remédios Contínuos"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Tipo Sanguíneo</Text>
                      <Input
                        ref={tipoSangueRef}
                        name="tipoSanguineo_Paciente"
                        autoCapitalize="words"
                        returnKeyType="next"
                        placeholder="Tipo sanguineo"
                      />
                    </Content>
                    <Line></Line>
                    <Content>
                      <Text style={{ marginBottom: 5 }}>Observação Paciente</Text>
                      <Input
                        ref={obsRef}
                        name="obs_Paciente"
                        placeholder="Observações"
                      />
                    </Content>
                    <ButtonArea style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Button title="Confirmar"
                        onPress={() => {
                          formPatientRef.current?.submitForm();
                        }}
                      >
                      </Button>
                      <Button title="Cancelar"
                        onPress={() => {
                          setModalVisible3(false)
                        }}>
                      </Button>
                    </ButtonArea>
                  </Form>
                </InfoModal>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}
