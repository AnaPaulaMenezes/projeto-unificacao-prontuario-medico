import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, NavigationContainer } from '@react-navigation/native';


import { Container, Image, Info, Text, Content, Title, Line, UserInfo, ButtonArea, InfoModal, Invisible } from './styles';
import { SafeAreaView, View, Alert, TouchableHighlight, TextInput, Button, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { List } from 'src/pages/History/styles';
import Input from '../Input';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../api';
import { useAuth } from '../../hooks/auth';


interface EditData {
    nome_Usuario: string;
    email_Usuario: [
        {
            id_Email: number,
            endereco_Email: string;
            codTipo_Email: number;
        },
    ];
    telefone_Usuario: [
        {
            Id_Usuario: number,
            Id_Telefone: number,
            numero_Telefone: string,
            codTipo_Telefone: number,
        },
    ];
};

export default function ProfileInfo({ data }) {
    const navigation = useNavigation();
    const vazio = "Vazio";
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [name, onChangeName] = React.useState(data.nome_Usuario)
    const [email, onChangeEmail] = React.useState(data.emails[0]?.endereco_Email ? data.emails[0].endereco_Email : vazio)
    const [tel, onChangeTel] = React.useState(data.telefones[0]?.numero_Telefone ? data.telefones[0]?.numero_Telefone : vazio)
    //const [email2, onChangeEmail2] = React.useState(data.emails[1]?.endereco_Email ? data.emails[1].endereco_Email : vazio)
    const nameRef = useRef<TextInput>(data.nome_Usuario);
    const formRef = useRef<FormHandles>(null);
    const telRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const { usuario } = useAuth();

    const idtelefone = data.telefones[0]?.Id_Telefone ? data.telefones[0]?.Id_Telefone : vazio
  
    const editUserInfo = useCallback(
        async (data: EditData) => {
            try {
                // formRef.current?.setErrors({});

                // const schema = Yup.object().shape({
                //     nome_Usuario: Yup.string().required('Nome obrigatório'),
                //     email_Usuario: Yup.string().email('Digite um e-mail válido'),
                // });

                // await schema.validate(data, {
                //     abortEarly: false,
                // });

                
                if (data.email_Usuario[0].endereco_Email !== "") {
                    try {
                        const jsonUsuario = JSON.stringify(usuario);
                        const usuarioDesestruturado = JSON.parse(jsonUsuario)
                        const newData = {
                            ...data, email_Usuario: [
                            {
                                id_Email: usuarioDesestruturado.emails[0].id_Email,
                                endereco_Email: data.email_Usuario[0].endereco_Email,
                                codTipo_Email: 1
                            },
                        ],
                            telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idtelefone ? idtelefone : null,
                                numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                codTipo_Telefone: 1,
                            },
                        ],
                        
                        }
                        console.log(newData, "newData aquri")
                        await api.put('users', newData);
                        const json = JSON.stringify(data);
                        const obj = JSON.parse(json)
                        onChangeName(obj.nome_Usuario);
                        onChangeEmail(obj.email_Usuario[0].endereco_Email)
                        console.log("fez o primeiro")
                    } catch {
                        Alert.alert('Erro ao atualizar');
                    }


                }else if(data.email_Usuario[0].endereco_Email === "") {
                    console.log("TA AQUI")

                }else if(data.email_Usuario[0].endereco_Email === "") {
                    console.log("TA AQUI")
                
                } else {
                    console.log("só nome")
                    await api.put('users', name);
                    const json = JSON.stringify(name);
                    const obj = JSON.parse(json)
                    onChangeName(obj.nome_Usuario);
                }


            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;

                }
                Alert.alert(
                    'Erro ao cadastrar',
                    err.message ? err.message : 'Ocorreu um erro ao editar informações, tente novamente.',
                );

            }
        },
        [navigation],
    );


    return (
        <><SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Image source={require("../../assets/download.png")}></Image> */}
                <View style={{ alignSelf: "center" }}>
                    <Title> Dados Pessoais</Title>
                    <Info>
                        <Content>
                            <UserInfo>Informações Hospitalares</UserInfo>
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
                    <Title> Dados Pessoais</Title>
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
                    <Title> Dados Pessoais</Title>
                    <Info>
                        <Content>
                            <UserInfo>Endereço</UserInfo>
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
            </ScrollView>
        </SafeAreaView>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style= {{backgroundColor: "#000000aa"}}>
                        <View style={{ alignSelf: "center" }}>
                            <InfoModal>
                                <Form
                                    // initialData={usuario}
                                    ref={formRef}
                                    onSubmit={editUserInfo}
                                    style={{ width: '100%' }}
                                >
                                    <Content>
                                        <Text style={{ marginBottom: 5 }}>Nome</Text>
                                        <Input style={{}}
                                            ref={nameRef}
                                            name="nome_Usuario"
                                            // autoCapitalize="words"
                                            // returnKeyType="next"
                                            // onSubmitEditing={() => {
                                            //     nameRef.current?.focus();
                                            // }}
                                            placeholder={name}
                                        />
                                    </Content>
                                    <Line></Line>
                                    <Content>
                                        <Text>Emails</Text>
                                        <Input style={{}}
                                            ref={emailRef}
                                            name="email_Usuario[0].endereco_Email"
                                            autoCapitalize="words"
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                emailRef.current?.focus();
                                            }}
                                            placeholder={email}
                                        />

                                    </Content>
                                    <Line></Line>
                                    <Content>
                                        <Text>Telefone</Text>
                                        <Input style={{}}
                                            ref={telRef}
                                            name="telefone_Usuario[0].numero_Telefone"
                                            autoCapitalize="words"
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                emailRef.current?.focus();
                                            }}
                                            placeholder={tel}
                                        />

                                    </Content>
                                    <ButtonArea style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Button title="Confirmar"
                                            onPress={() => {
                                                formRef.current?.submitForm();
                                                setModalVisible(false);
                                            }}
                                        >
                                        </Button>
                                        <Button title="Cancelar"
                                            onPress={() => {
                                                setModalVisible(false)
                                            }}>
                                        </Button>
                                    </ButtonArea>
                                </Form>
                            </InfoModal>

                        </View>
                    </View>
                </Modal>
            </View>

        </>


    );
}
