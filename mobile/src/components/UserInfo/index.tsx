import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, NavigationContainer } from '@react-navigation/native';


import { Container, Image, Info, Text, Content, Title, Line, UserInfo, ButtonArea, InfoModal } from './styles';
import { SafeAreaView, View, Alert, Modal, TouchableHighlight, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { List } from 'src/pages/History/styles';
import Button from '../Button';
import Input from '../Input';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';


interface EditData {
    Id_Usuario: number;
    nome_Usuario: string;
    cpf_Usuario: string;
    rg_Usuario: string;
    emails: [{
      endereco_Email: string,
    }];
  };

export default function ProfileInfo({ data }) {
    const navigation = useNavigation();
    const vazio = "Vazio";
    const [modalVisible, setModalVisible] = useState(false);
    const [name, onChangeName] = React.useState(data.nome_Usuario)
    const [email, onChangeEmail] = React.useState(data.emails[0].endereco_Email)
    const [email2, onChangeEmail2] = React.useState(data.emails[1]?.endereco_Email ? data.emails[1].endereco_Email : vazio)
    const [email3, onChangeEmail3] = React.useState(data.emails[2]?.endereco_Email ? data.emails[2].endereco_Email : vazio)
    const nameRef = useRef<TextInput>(data.nome_Usuario);
    const formRef = useRef<FormHandles>(null);
    const RGRef = useRef<TextInput>(null);
    const CPFRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);



    const handleSignUp = (data: EditData) => {
        try{
            formRef.current?.setErrors({});
        }catch{
            const schema = Yup.object().shape({
                nome_Usuario: Yup.string().required('Nome obrigatório'),
                cpf_Usuario: Yup.string().required('CPF obrigatório'),
                rg_Usuario: Yup.string().required('RG obrigatório'),
                email_Usuario: Yup.string().email('Digite um e-mail válido'),
                senha_Usuario: Yup.string().min(6, 'No mínimo 6 digitos'),
              });

        }
    }

    return (
        <><SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={require("../../assets/download.png")}></Image>
                <View style={{ alignSelf: "center" }}>
                    <Title> Dados Pessoais</Title>
                    <Info>
                        <Content>
                            <Text>Nome</Text>
                            <UserInfo>{data.nome_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>CPF</Text>
                            <UserInfo>{data.cpf_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>RG</Text>
                            <UserInfo>{data.rg_Usuario}</UserInfo>
                        </Content>
                        <Line></Line>
                        <Content>
                            <Text>Email principal</Text>
                            <UserInfo>{data.emails[0].endereco_Email}</UserInfo>
                            {/* {data.emails[1]?.endereco_Email ? (<UserInfo>{data.emails[1].endereco_Email}</UserInfo>) : (<Text>Oi</Text>)} */}
                        </Content>
                        <Line></Line>
                        <ButtonArea>
                            <Button
                                onPress={() => { setModalVisible(true) }}
                            >
                                Oi
                            </Button>
                        </ButtonArea>
                    </Info>
                </View>
            </ScrollView>
        </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ alignSelf: "center" }}>
                    <InfoModal>
                        <Form
                            ref={formRef}
                            onSubmit={handleSignUp}
                            style={{ width: '100%' }}
                        >
                            <Content>
                                <Text style={{ marginBottom: 5 }}>Nome</Text>
                                <Input style={{}}
                                    ref={nameRef}
                                    name="nome_Usuario"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => {
                                    // }}
                                    placeholder={name}
                                />
                            </Content>
                            <Line></Line>
                            <Content>
                                <Text>Emails</Text>
                                <Input style={{}}
                                    ref={nameRef}
                                    name="emails[0].endereco_Email"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => {
                                    // }}
                                    placeholder={email}
                                />
                                <Input style={{}}
                                    ref={nameRef}
                                    name="emails[0].endereco_Email"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => {
                                    // }}
                                    placeholder={email2}
                                />
                                <Input style={{}}
                                    ref={nameRef}
                                    name="emails[0].endereco_Email"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => {
                                    // }}
                                    placeholder={email3}
                                />

                            </Content>
                            <Line></Line>
                            <Content>
                                <Text>RG</Text>
                                <Input style={{}}
                                    ref={nameRef}
                                    name="emails[0].endereco_Email"
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                    // onSubmitEditing={() => {
                                    // }}
                                   // placeholder={rg}
                                />
                            </Content>
                            <Line></Line>
                            <Content>
                                <Text>Data de nascimento</Text>
                                <UserInfo>Cidade: Macapá2</UserInfo>
                            </Content>
                            <ButtonArea style={{flexDirection: 'row'}}>
                            <Button style={{width: '30%', backgroundColor: '#20c71a'}}>
                                    Confirmar
                            </Button>
                            <Button style={{width: '30%', backgroundColor: '#FF0000'}}>
                                    Cancelar
                            </Button>
                            </ButtonArea>
                        </Form>
                    </InfoModal>
                </View>
            </Modal></>


    );
}
