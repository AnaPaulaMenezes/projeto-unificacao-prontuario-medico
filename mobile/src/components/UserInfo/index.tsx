import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, NavigationContainer } from '@react-navigation/native';


import { Container, Image, Info, Text, Content, Title, Line, UserInfo, ButtonArea, InfoModal, Invisible, ModalData, ModalAddress } from './styles';
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
//import { useForm } from "react-hook-form";




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
    const vazio = "Vazio";
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [name, onChangeName] = React.useState(data.nome_Usuario)
    const [cpf, onChangeCpf] = React.useState(data.cpf_Usuario)
    const [email, onChangeEmail] = React.useState(data.emails[0]?.endereco_Email ? data.emails[0].endereco_Email : vazio)
    const [aviso, onChangeAviso] = React.useState("")
    const [tel, onChangeTel] = React.useState(data.telefones[0]?.numero_Telefone ? data.telefones[0]?.numero_Telefone : vazio)
    const [logEndereco, onChangeLogEndereco] = React.useState(data.endereco?.logradouro_Endereco ? data.endereco?.logradouro_Endereco : vazio)
    const [numEndereco, onChangeNumEndereco] = React.useState(data.endereco?.numero_Endereco ? data.endereco?.numero_Endereco : vazio)
    const [bairroEndereco, onChangeBairroEndereco] = React.useState(data.endereco?.bairro_Endereco ? data.endereco?.bairro_Endereco : vazio)
    const [alergiaPatient, onChangeAlergiaPatient] = React.useState(data.paciente?.alergias_Paciente ? data.paciente?.alergias_Paciente : vazio)
    const [obsPatient, onChangeObsPatient] = React.useState(data.paciente?.obs_Paciente ? data.paciente?.obs_Paciente : vazio)
    const [tipoSangue, onChangeTipoSangue] = React.useState(data.paciente?.tipoSanguineo_Paciente ? data.paciente?.tipoSanguineo_Paciente : vazio)
    const nameRef = useRef<TextInput>(data.nome_Usuario);
    const formRef = useRef<FormHandles>(null);
    const formEndRef = useRef<FormHandles>(null);
    const formPatientRef = useRef<FormHandles>(null);
    const telRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const logRef = useRef<TextInput>(null);
    const numEndRef = useRef<TextInput>(null);
    const alergiaRef = useRef<TextInput>(null);
    const obsRef = useRef<TextInput>(null);
    const tipoSangueRef = useRef<TextInput>(null);
    const mensagemErro = "O e-mail digitado não é válido"


    const { usuario } = useAuth();
    //const { register, handleSubmit, errors } = useForm();


    const idTelefone = data.telefones[0]?.Id_Telefone ? data.telefones[0]?.Id_Telefone : null;
    const numTelefone = data.telefones[0]?.numero_Telefone ? data.telefones[0]?.numero_Telefone : null;
    const idEmail = data.emails[0]?.id_Email ? data.emails[0]?.id_Email : "";
    const endEmail = data.emails[0]?.endereco_Email ? data.emails[0]?.endereco_Email : "";
    const nomeUsuario = data.nome_Usuario;
    const idUsuario = data.Id_Usuario;
    const idEndereco2 = data.endereco?.Id_Endereco;
    const idPaciente = data.paciente?.Id_Paciente


    const validateEmail = (email: string) => {
        if (email.indexOf('@') > -1){
            return true;
        }else{
            return false;
        }
        
    }

    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        nomeUsuario
    });

    const editUserInfo = useCallback(
        async (data: EditData) => {
            try {
                 formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    endereco_Email: Yup.string().email('Digite um e-mail válido'),
                });

                await schema.validate(data, {
                    //abortEarly: false,
                    
                });

                if (data.email_Usuario[0].endereco_Email === "" && data.telefone_Usuario[0].numero_Telefone === "" && data.nome_Usuario === "") {
                    Alert.alert("Nenhuma informação alterada")
                    return
                }

                if (data.email_Usuario[0].endereco_Email !== "" && data.telefone_Usuario[0].numero_Telefone !== "" && data.nome_Usuario === "") {
                    //INSERIR EMAIL E NÚMERO DE TELEFONE
                    if (validateEmail(data.email_Usuario[0].endereco_Email) === false){
                        onChangeAviso(mensagemErro)
                        return
                    }
                    try {
                        const jsonUsuario = JSON.stringify(usuario);
                        const usuarioDesestruturado = JSON.parse(jsonUsuario)
                        if (!idTelefone && !idEmail && data.nome_Usuario === "") {
                            const newData = {
                                ...data,
                                nome_Usuario: nomeUsuario,
                                email_Usuario: [
                                    {
                                        endereco_Email: data.email_Usuario[0].endereco_Email,
                                        codTipo_Email: 1
                                    },
                                ],
                                telefone_Usuario: [
                                    {
                                        Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                        numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                        codTipo_Telefone: 1,
                                    },
                                ],

                            }
                            await api.put('users', newData);
                            const json = JSON.stringify(newData);
                            const obj = JSON.parse(json)
                            onChangeEmail(obj.email_Usuario[0].endereco_Email)
                            onChangeTel(obj.telefone_Usuario[0].numero_Telefone)
                            Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                            onChangeAviso("")

                        } else {
                            const newData = {

                                ...data, email_Usuario: [
                                    {
                                        id_Email: idEmail,
                                        endereco_Email: data.email_Usuario[0].endereco_Email,
                                        codTipo_Email: 1
                                    },
                                ],
                                telefone_Usuario: [
                                    {
                                        Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                        Id_Telefone: idTelefone,
                                        numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                        codTipo_Telefone: 1,
                                    },
                                ],

                            }

                            await api.put('users', newData);
                            const json = JSON.stringify(data);
                            const obj = JSON.parse(json)
                            onChangeName(obj.nome_Usuario);
                            onChangeEmail(obj.email_Usuario[0].endereco_Email)
                            onChangeTel(obj.telefone_Usuario[0].numero_Telefone)
                            Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                            onChangeAviso("")
                        }
                    } catch {
                        Alert.alert('Erro ao atualizar');
                    }


                } else if (data.email_Usuario[0].endereco_Email === "" && data.telefone_Usuario[0].numero_Telefone === "" && data.nome_Usuario !== "") {
                    // ALTERANDO APENAS NOME

                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {

                        ...data,
                        nome_Usuario: data.nome_Usuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: endEmail,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: numTelefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }
                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeName(obj.nome_Usuario);
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")


                } else if (data.email_Usuario[0].endereco_Email !== "" && data.telefone_Usuario[0].numero_Telefone === "" && data.nome_Usuario === "") {
                    // ALTERANDO APENAS EMAIL

                    if (validateEmail(data.email_Usuario[0].endereco_Email) === false){
                        onChangeAviso(mensagemErro)
                        return
                    }


                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {
                        ...data,
                        nome_Usuario: nomeUsuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: data.email_Usuario[0].endereco_Email,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: numTelefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }

                    validateEmail(newData.email_Usuario[0].endereco_Email)

                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeEmail(obj.email_Usuario[0].endereco_Email)
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")

                } else if (data.email_Usuario[0].endereco_Email === "" && data.telefone_Usuario[0].numero_Telefone !== "" && data.nome_Usuario === "") {
                    //ALTERANDO APENAS NUMERO DE TEL

                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {
                        ...data,
                        nome_Usuario: nomeUsuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: endEmail,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }

                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeTel(obj.telefone_Usuario[0].numero_Telefone)
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")

                } else if (data.email_Usuario[0].endereco_Email !== "" && data.telefone_Usuario[0].numero_Telefone === "" && data.nome_Usuario !== "") {
                    //alterando nome e email

                    if (validateEmail(data.email_Usuario[0].endereco_Email) === false){
                        onChangeAviso(mensagemErro)
                        return
                    }


                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {
                        ...data,
                        nome_Usuario: data.nome_Usuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: data.email_Usuario[0].endereco_Email,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: numTelefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }

                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeName(obj.nome_Usuario);
                    onChangeEmail(obj.email_Usuario[0].endereco_Email)
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")

                } else if (data.email_Usuario[0].endereco_Email === "" && data.telefone_Usuario[0].numero_Telefone !== "" && data.nome_Usuario !== "") {
                    //alterando nome e TELEFONE

                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {
                        ...data,
                        nome_Usuario: data.nome_Usuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: endEmail,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }

                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeName(obj.nome_Usuario);
                    onChangeTel(obj.telefone_Usuario[0].numero_Telefone)
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")

                } else if (data.email_Usuario[0].endereco_Email !== "" && data.telefone_Usuario[0].numero_Telefone !== "" && data.nome_Usuario !== "") {
                    //alterando nome telefone e email

                    if (validateEmail(data.email_Usuario[0].endereco_Email) === false){
                    onChangeAviso(mensagemErro)
                    return
                    }
                    const jsonUsuario = JSON.stringify(usuario);
                    const usuarioDesestruturado = JSON.parse(jsonUsuario)
                    const newData = {
                        ...data,
                        nome_Usuario: data.nome_Usuario,
                        email_Usuario: [
                            {
                                id_Email: idEmail,
                                endereco_Email: data.email_Usuario[0].endereco_Email,
                                codTipo_Email: 1
                            },
                        ],
                        telefone_Usuario: [
                            {
                                Id_Usuario: usuarioDesestruturado.Id_Usuario,
                                Id_Telefone: idTelefone,
                                numero_Telefone: data.telefone_Usuario[0].numero_Telefone,
                                codTipo_Telefone: 1,
                            },
                        ],

                    }

                    await api.put('users', newData);
                    const json = JSON.stringify(newData);
                    const obj = JSON.parse(json)
                    onChangeName(obj.nome_Usuario);
                    onChangeEmail(obj.email_Usuario[0].endereco_Email)
                    onChangeTel(obj.telefone_Usuario[0].numero_Telefone)
                    Alert.alert("Atualização efetuada com sucesso. Por favor, relogue.")
                    onChangeAviso("")

                } else {
                    // console.log("só nome")
                    // await api.put('users', name);
                    // const json = JSON.stringify(name);
                    // const obj = JSON.parse(json)
                    // onChangeName(obj.nome_Usuario);
                    Alert.alert("Erro, favor tentar novamente")
                    onChangeAviso("")
                }

                setModalVisible(false);


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

    const editAddress = useCallback(
        async (data: EditAddress) => {
            try {
                if (!idEndereco2) {
                    const newData = {
                        ...data,
                        Id_Usuario: idUsuario,
                        logradouro_Endereco: data.endereco.logradouro_Endereco ? data.endereco.logradouro_Endereco : "",
                        cep_Endereco: data.cep_Endereco ? data.cep_Endereco : "",
                        numero_Endereco: data.endereco.numero_Endereco ? data.endereco.numero_Endereco : "",
                        bairro_Endereco: data.bairro_Endereco ? data.bairro_Endereco : "",
                        cidade_Endereco: data.cidade_Endereco ? data.cidade_Endereco : "",
                        estado_Endereco: data.estado_Endereco ? data.estado_Endereco : "",
                        pais_Endereco: data.pais_Endereco ? data.pais_Endereco : "",
                        complemento_Endereco: data.complemento_Endereco ? data.complemento_Endereco : "",
                    }
                    await api.post('users/endereco', newData);
                   // console.log(newData, "newdata aqui")
                    onChangeLogEndereco(data.endereco.logradouro_Endereco);
                    onChangeNumEndereco(data.endereco.numero_Endereco);
                    Alert.alert(
                        'Cadastro realizado, favor relogar para aplicar',
                    );

                } else if (data.endereco.logradouro_Endereco === "" || data.endereco.numero_Endereco === "") {
                    Alert.alert('Favor preencher todos campos',);
                    return;
                } else {
                    const newData = {
                        ...data,
                        Id_Endereco: idEndereco2,
                        Id_Usuario: idUsuario,
                        logradouro_Endereco: data.endereco.logradouro_Endereco,
                        cep_Endereco: 123123,
                        numero_Endereco: data.endereco.numero_Endereco,
                        bairro_Endereco: data.endereco.bairro_Endereco,
                        cidade_Endereco: data.cidade_Endereco ? data.cidade_Endereco : "",
                        estado_Endereco: data.estado_Endereco ? data.estado_Endereco : "",
                        pais_Endereco: data.pais_Endereco ? data.pais_Endereco : "",
                        complemento_Endereco: data.complemento_Endereco ? data.complemento_Endereco : "",
                    }
                    await api.put('users/endereco', newData);

                    onChangeLogEndereco(data.endereco.logradouro_Endereco);
                    onChangeNumEndereco(data.endereco.numero_Endereco);
                    Alert.alert(
                        'Cadastro realizado, favor relogar para aplicar',
                    );
                }
                setModalVisible2(false);

            } catch (err) {
                Alert.alert(
                    'Erro ao cadastrar',
                    err.message ? err.message : 'Ocorreu um erro ao fazer cadastro, tente novamente.',
                );

            }
        },
        [navigation],
    );

    const editPatient = useCallback(
        async (data: EditPatient) => {
            try {
                if (!idPaciente) {
                    const newData = {
                        ...data,
                        Id_Paciente: idPaciente,
                        tipoSanguineo_Paciente: data.tipoSanguineo_Paciente,
                        altura_Paciente: 0,
                        peso_Paciente: 0,
                        obs_Paciente: data.obs_Paciente,
                        alergias_Paciente: data.alergias_Paciente,
                        doencasCronicas_Paciente: "",
                        remediosContinuos_Paciente: "",
                    }
                    await api.post('users/paciente', newData);

                    Alert.alert(
                        'Cadastro realizado, favor relogar para aplicar',
                    );

                } else if(data.obs_Paciente === "" || data.peso_Paciente === "" || data.tipoSanguineo_Paciente === ""){
                    Alert.alert(
                        'Favor preencher todos campos',
                    );
                    return

                }else {
                    const newData = {
                        ...data,
                        Id_Paciente: idPaciente,
                        tipoSanguineo_Paciente: data.tipoSanguineo_Paciente,
                        altura_Paciente: 0,
                        peso_Paciente: 0,
                        obs_Paciente: data.obs_Paciente,
                        alergias_Paciente: data.alergias_Paciente,
                        doencasCronicas_Paciente: "",
                        remediosContinuos_Paciente: "",
                    }
                    
                    await api.put('users/paciente', newData);
                    onChangeObsPatient(data.obs_Paciente)
                    onChangeAlergiaPatient(data.alergias_Paciente)
                    onChangeTipoSangue(data.tipoSanguineo_Paciente)

                    Alert.alert(
                        'Cadastro realizado, favor relogar para aplicar',
                    );


                }

                setModalVisible3(false);

            } catch (err) {
                Alert.alert(
                    'Erro ao cadastrar',
                    err.message ? err.message : 'Ocorreu um erro ao fazer cadastro, tente novamente.',
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
                    <Title></Title>
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
                                    // initialData={usuario}
                                    ref={formRef}
                                    onSubmit={editUserInfo}
                                    style={{ width: '100%' }}
                                >
                                    <Content>
                                        <Text style={{ marginBottom: 5 }}>CPF</Text>
                                        <Input style={{}}
                                            name="cpf"
                                            placeholder={cpf}
                                            editable={false}
                                        />
                                    </Content>
                                    <Line></Line>
                                    <Content>
                                        <Text style={{ marginBottom: 5 }}>Nome</Text>
                                        <Input style={{}}
                                            ref={nameRef}
                                            name="nome_Usuario"
                                            placeholder={name}
                                        />
                                    </Content>
                                    <Line></Line>
                                    <Content>
                                        <Text style={{ marginBottom: 5 }}>Email</Text>
                                        <Input style={{}}
                                            name="email_Usuario[0].endereco_Email"
                                            autoCapitalize="words"
                                            returnKeyType="next"
                                            placeholder={email}
                                            defaultValue={email}
                                        />
                                        <Text style={{color: 'red'}}>{aviso}</Text>

                                    </Content>
                                    <Line></Line>
                                    <Content>
                                        <Text style={{ marginBottom: 5 }}>Telefone</Text> 
                                        <Input style={{}}
                                            ref={telRef}
                                            name="telefone_Usuario[0].numero_Telefone"
                                            autoCapitalize="words"
                                            returnKeyType="next"
                                            placeholder={tel}
                                            defaultValue={tel}
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
                    //////////////////////////////////////////////////////////// AQUIIIIIIIII
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
                                        onSubmit={editAddress}
                                        style={{ width: '100%' }}
                                    >
                                        <Content>
                                            <Text style={{ marginBottom: 5 }}>Rua</Text>
                                            <Input style={{}}
                                                ref={logRef}
                                                name="endereco.logradouro_Endereco"
                                                placeholder={logEndereco}
                                            />
                                        </Content>
                                        <Line></Line>
                                        <Content>
                                            <Text style={{ marginBottom: 5 }}>Número</Text>
                                            <Input style={{}}
                                                ref={numEndRef}
                                                name="endereco.numero_Endereco"
                                                autoCapitalize="words"
                                                returnKeyType="next"
                                                placeholder={numEndereco}
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
                    //////////////////////////////////////////////////////////// ultimo
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
                                    >
                                        <Content>
                                            <Text style={{ marginBottom: 5 }}>Observação Paciente</Text>
                                            <Input style={{}}
                                                ref={obsRef}
                                                name="obs_Paciente"
                                                placeholder={obsPatient}
                                            />
                                        </Content>
                                        <Line></Line>
                                        <Content>
                                            <Text style={{ marginBottom: 5 }}>Alergias</Text>
                                            <Input style={{}}
                                                ref={alergiaRef}
                                                name="alergias_Paciente"
                                                autoCapitalize="words"
                                                returnKeyType="next"
                                                placeholder={alergiaPatient}
                                            />
                                        </Content>
                                        <Line></Line>
                                        <Content>
                                            <Text style={{ marginBottom: 5 }}>Tipo Sanguíneo</Text>
                                            <Input style={{}}
                                                ref={tipoSangueRef}
                                                name="tipoSanguineo_Paciente"
                                                autoCapitalize="words"
                                                returnKeyType="next"
                                                placeholder={tipoSangue}
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
